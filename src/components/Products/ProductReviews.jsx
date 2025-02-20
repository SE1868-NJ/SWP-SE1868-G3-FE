import { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Row, Col, Badge, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { feedbackService } from '../../services/feedbackService';

const ProductReviews = ({ productId }) => {
    const [feedbacks, setFeedback] = useState({
        rating: 0,
        total: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        commentsCount: 0,
        mediaCount: 0,
        reviews: []
    });

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await feedbackService.getFeedbackByProductId(productId);
            setFeedback(response);
        };

        fetchReviews();
    }, []);

    const [selectedFilter, setSelectedFilter] = useState({ rating: 'all', type: 'all' });

    const filteredReviews = feedbacks?.reviews?.filter(review => {
        if (selectedFilter.rating !== 'all' && review.rating !== parseInt(selectedFilter.rating)) {
            return false;
        }
        if (selectedFilter.type === 'comment' && !review.comment) {
            return false;
        }
        if (selectedFilter.type === 'media' && (!review.images || review.images.length === 0)) {
            return false;
        }

        return true;
    }) || [];

    return (
        <div className="p-3">
            {/* Rating Summary */}
            <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={3} className="text-center border-end">
                            <div className="display-4 fw-bold text-danger">{feedbacks.rating}</div>
                            <div className="text-muted mb-2">trên 5</div>
                            <div className="star-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-warning h4">★</span>
                                ))}
                            </div>
                        </Col>

                        <Col md={6} className="px-4">
                            {[5, 4, 3, 2, 1].map(star => (
                                <div
                                    key={star}
                                    className={`d-flex align-items-center mb-2`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedFilter(prev => ({
                                        ...prev,
                                        rating: prev.rating === star ? 'all' : star
                                    }))}
                                >
                                    <span
                                        className="me-2"
                                        style={{
                                            width: '71px',
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            color: selectedFilter.rating === star ? "#DC3545" : "#333",
                                            fontWeight: selectedFilter.rating === star ? "bold" : "normal",
                                            border: selectedFilter.rating === star ? "2px solid #DC3545" : "2px solid #ccc",
                                            cursor: "pointer",
                                            backgroundColor: selectedFilter.rating === star ? "#F8D7DA" : "transparent",
                                            transition: "all 0.3s ease-in-out"
                                        }}
                                    >
                                        {star} sao
                                    </span>
                                    <span className="text-muted me-2">({feedbacks.counts[star]})</span>
                                    <div className="flex-grow-1">
                                        <div
                                            className="bg-warning"
                                            style={{
                                                height: '8px',
                                                width: `${(feedbacks.counts[star] / feedbacks.total * 100)}%`,
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Col>

                        <Col md={3} className="text-center">
                            <Button
                                variant={selectedFilter.rating === 'all' ? "danger" : "outline-danger"}
                                className="w-100 mb-2"
                                onClick={() => setSelectedFilter({ rating: 'all', type: 'all' })}
                            >
                                Tất Cả ({feedbacks.total})
                            </Button>
                            <Button
                                variant={selectedFilter.type === 'comment' ? "danger" : "outline-danger"}
                                className="w-100 mb-2"
                                onClick={() => setSelectedFilter(prev => ({ ...prev, type: 'comment' }))}
                            >
                                Có Bình Luận ({feedbacks.commentsCount})
                            </Button>
                            <Button
                                variant={selectedFilter.type === 'media' ? "danger" : "outline-danger"}
                                className="w-100"
                                onClick={() => setSelectedFilter(prev => ({ ...prev, type: 'media' }))}
                            >
                                Có Hình Ảnh/Video ({feedbacks.mediaCount})
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Reviews List */}
            <ListGroup>
                {!filteredReviews?.length ? (
                    <p className="text-muted">Không có đánh giá nào cho bộ lọc này.</p>
                ) : (
                    filteredReviews.map((review, index) => (
                        <ListGroup.Item key={index} className="mb-3 shadow-sm">
                            <Row>
                                <Col md={1}>
                                    <Image src={review.avatar} roundedCircle width={50} height={50} />
                                </Col>
                                <Col md={11}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <Badge bg="warning" className="me-2">{review.rating} ★</Badge>
                                            <strong>{review.user}</strong>
                                        </div>
                                        <span className="text-muted">{review.date}</span>
                                    </div>

                                    <p className="mt-2 mb-0">{review.comment}</p>

                                    {/* Images */}
                                    {review.images?.length > 0 && (
                                        <div className="d-flex mt-2">
                                            {review.images.map((img, imgIdx) => (
                                                <Image key={imgIdx} src={img} className="me-2" width={60} height={60} />
                                            ))}
                                        </div>
                                    )}

                                    {review.sellerReply && (
                                        <div className="bg-light p-2 mt-2 rounded text-muted small">
                                            <strong>Phản hồi của người bán:</strong> {review.sellerReply}
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </div>
    );
};


export default ProductReviews;