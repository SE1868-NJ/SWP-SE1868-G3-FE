import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FaCamera, FaStar, FaTimes } from 'react-icons/fa';
import { feedbackService } from '../../services/feedbackService';

const ReviewModal = ({ show, onHide, product, onSubmitReview }) => {
  console.log('ReviewModal rendered, show:', show);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showError, setShowError] = useState(false);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const user_id = 4;
  const imageInputRef = React.useRef(null);

  useEffect(() => {
    if (show) {
      setRating(5);
      setHover(0);
      setReviewText('');
      setShowError(false);
      setImages([]);
      setErrorMessage('');
      setIsLoading(false);
      setShowSuccessModal(false);
    }
  }, [show]);

  const handleImageUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (images.length + files.length > 5) {
        setErrorMessage('Chỉ được phép tải lên tối đa 5 hình ảnh');
        return;
      }
      const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setErrorMessage('Kích thước hình ảnh không được vượt quá 5MB');
        return;
      }
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
      setErrorMessage('');
    },
    [images],
  );

  const handleRemoveImage = useCallback((index) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  const handleClose = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    if (onHide) onHide();
  }, [images, onHide]);

  const handleCloseSuccess = useCallback(() => {
    console.log('Closing success modal');
    setShowSuccessModal(false);
    handleClose();
  }, [handleClose]);

  const handleImageButtonClick = useCallback(() => {
    imageInputRef.current.click();
  }, []);

  const handleSubmitReview = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      if (reviewText.trim() === '') {
        setShowError(true);
        setErrorMessage('Vui lòng nhập nội dung đánh giá');
        return;
      }

      if (!product || !product.id) {
        setErrorMessage('Không tìm thấy thông tin sản phẩm. Vui lòng thử lại.');
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('product_id', product.id);
        formData.append('rating', rating);
        formData.append('comment', reviewText.trim());
        images.forEach((image) => {
          formData.append('images', image.file);
        });

        const response = await feedbackService.createFeedback(formData);
        console.log('API response:', response);

        // Kiểm tra dựa trên message thay vì status
        if (response && response.message === 'Gửi đánh giá thành công!') {
          console.log('Feedback submitted successfully, showing success modal');
          if (onSubmitReview) {
            onSubmitReview(response.feedback); // Sử dụng response.feedback thay vì response.data
          }
          setShowSuccessModal(true);
        } else {
          console.error('Failed response:', response);
          setErrorMessage(response?.message || 'Đã có lỗi xảy ra khi gửi đánh giá.');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        setErrorMessage(
          error?.response?.data?.message ||
          error?.message ||
          'Đã có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [rating, reviewText, product, images, user_id, onSubmitReview],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && show) {
        handleClose();
      } else if (e.key === 'Enter' && e.ctrlKey && show) {
        handleSubmitReview();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, handleClose, handleSubmitReview]);

  const getRatingText = useCallback((rating) => {
    switch (rating) {
      case 1:
        return 'Tệ';
      case 2:
        return 'Không hài lòng';
      case 3:
        return 'Bình thường';
      case 4:
        return 'Hài lòng';
      case 5:
        return 'Tuyệt vời';
      default:
        return 'Tuyệt vời';
    }
  }, []);

  return (
    <>
      <Modal
        show={show && !showSuccessModal}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={true}
        centered
      >
        <Modal.Header className="border-bottom-0 pb-0">
          <Modal.Title className="w-100 text-center fs-4">Đánh Giá Sản Phẩm</Modal.Title>
          <Button
            variant="link"
            className="btn-close position-absolute"
            style={{ right: '15px', top: '15px' }}
            onClick={handleClose}
            aria-label="Close"
            disabled={isLoading}
          />
        </Modal.Header>
        <Modal.Body className="pt-2">
          {product && (
            <Row className="mb-4">
              <Col xs={12}>
                <div className="d-flex">
                  <div style={{ width: '80px', marginRight: '15px' }}>
                    <img
                      src={product.image_url || 'https://via.placeholder.com/80'}
                      alt={product.product_name || 'Product'}
                      className="img-fluid"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <p className="mb-1 fw-bold">{product.product_name || 'Sản phẩm không xác định'}</p>
                    <small className="text-muted">
                      Phân loại hàng: {product.category?.name || 'Không xác định'}
                    </small>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          <Row className="mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <span className="me-3">Chất lượng sản phẩm</span>
              <div className="d-flex me-3">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <FaStar
                      key={i}
                      size={25}
                      color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                      style={{ cursor: 'pointer', marginRight: '5px' }}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  );
                })}
              </div>
              <span className="text-warning fw-bold">{getRatingText(hover || rating)}</span>
            </Col>
          </Row>

          <div className="bg-light p-3 rounded mb-4">
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmitReview(); }}>
              <Form.Group className="mb-3">
                <Form.Label>Nhận xét của bạn:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={reviewText}
                  onChange={(e) => {
                    setReviewText(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setShowError(false);
                      setErrorMessage('');
                    }
                  }}
                  placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                  isInvalid={showError}
                  disabled={isLoading}
                />
                {showError && (
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập nội dung đánh giá
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">{errorMessage}</div>
              )}

              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
                multiple
                disabled={isLoading || images.length >= 5}
              />

              <div className="d-flex align-items-center mb-3">
                <Button
                  variant="outline-secondary"
                  className="me-2 d-flex align-items-center"
                  onClick={handleImageButtonClick}
                  disabled={isLoading || images.length >= 5}
                >
                  <FaCamera className="me-2" /> Thêm Hình Ảnh {images.length > 0 && `(${images.length}/5)`}
                </Button>
              </div>

              {images.length > 0 && (
                <div className="mb-3">
                  <p className="mb-2">Hình ảnh đã tải lên:</p>
                  <div className="d-flex flex-wrap">
                    {images.map((image, index) => (
                      <div key={`img-${index}`} className="position-relative me-2 mb-2">
                        <img
                          src={image.preview}
                          alt={`Preview ${index}`}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          className="border"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute d-flex align-items-center justify-content-center"
                          style={{ top: '2px', right: '2px', width: '20px', height: '20px', padding: '0', borderRadius: '50%' }}
                          onClick={() => handleRemoveImage(index)}
                          disabled={isLoading}
                        >
                          <FaTimes size={10} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="px-4"
            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
            disabled={isLoading}
          >
            TRỞ LẠI
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmitReview}
            disabled={reviewText.trim() === '' || isLoading}
            className="px-4"
            style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
          >
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                ĐANG GỬI...
              </>
            ) : (
              'HOÀN THÀNH'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Popup thông báo thành công */}
      <Modal
        show={showSuccessModal}
        onHide={handleCloseSuccess}
        centered
      >
        <Modal.Body className="text-center fs-3 fw-bold text-dark">
          Gửi đánh giá thành công!
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button
            variant="secondary"
            onClick={handleCloseSuccess}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewModal;