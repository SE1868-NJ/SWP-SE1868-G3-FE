import React, { useState, useEffect } from 'react';
import { useSeller } from '../../../hooks/contexts/SellerContext';
import { Link } from 'react-router-dom';
// import { shopService } from '../../services/shopService';

function ShopInformation() {
  const { shops } = useSeller();
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [shopDetails, setShopDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shopData, setShopData] = useState({
    shop_name: '',
    shop_description: '',
    shop_logo: '',
    shop_address: '',
    shop_email: '',
    shop_phone: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (shops && shops.length > 0) {
      const shopToUse = shops[0];

      if (shopToUse) {
        setSelectedShopId(shopToUse.shop_id);
        setShopDetails(shopToUse);
        setShopData({
          shop_name: shopToUse.shop_name || '',
          shop_description: shopToUse.shop_description || '',
          shop_logo: shopToUse.shop_logo || '',
          shop_address: shopToUse.shop_address || '',
          shop_email: shopToUse.shop_email || '',
          shop_phone: shopToUse.shop_phone || ''
        });
      }
    }
  }, [shops]);

  const handleShopChange = (e) => {
    const shopId = e.target.value;
    const selectedShop = shops.find(shop => shop.shop_id.toString() === shopId.toString());

    if (selectedShop) {
      setSelectedShopId(shopId);
      setShopDetails(selectedShop);
      setShopData({
        shop_name: selectedShop.shop_name || '',
        shop_description: selectedShop.shop_description || '',
        shop_logo: selectedShop.shop_logo || '',
        shop_address: selectedShop.shop_address || '',
        shop_email: selectedShop.shop_email || '',
        shop_phone: selectedShop.shop_phone || ''
      });
    }

    setIsEditing(false);
    setPreviewImage(null);
    setSelectedFile(null);
    setSaveMessage({ type: '', text: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopData({
      ...shopData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSaveMessage({
          type: 'danger',
          text: 'Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 2MB.'
        });
        return;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setSaveMessage({
          type: 'danger',
          text: 'Định dạng file không hợp lệ. Chỉ chấp nhận JPG, JPEG, PNG.'
        });
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      setSaveMessage({ type: '', text: '' });
    }
  };

  const handleSave = async () => {
    if (!shopData.shop_name.trim()) {
      setSaveMessage({ type: 'danger', text: 'Tên shop không được để trống' });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('shop_name', shopData.shop_name);
      formData.append('shop_description', shopData.shop_description || '');
      formData.append('shop_address', shopData.shop_address || '');
      formData.append('shop_email', shopData.shop_email || '');
      formData.append('shop_phone', shopData.shop_phone || '');

      if (selectedFile) {
        formData.append('shop_logo', selectedFile);
      }

      const updatedShop = await shopService.updateShop(selectedShopId, formData);

      setIsLoading(false);
      setSaveMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
      setIsEditing(false);
      setPreviewImage(null);
      setSelectedFile(null);

      setShopDetails(updatedShop);
      setShopData({
        shop_name: updatedShop.shop_name || '',
        shop_description: updatedShop.shop_description || '',
        shop_logo: updatedShop.shop_logo || '',
        shop_address: updatedShop.shop_address || '',
        shop_email: updatedShop.shop_email || '',
        shop_phone: updatedShop.shop_phone || ''
      });
    } catch (error) {
      setIsLoading(false);
      setSaveMessage({ type: 'danger', text: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
      console.error("Save error:", error);
    }
  };

  if (isLoading && !shopDetails) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">Đang tải thông tin gian hàng...</p>
      </div>
    );
  }

  if (!shopDetails && shops.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Không tìm thấy gian hàng nào. Vui lòng tạo gian hàng mới.
        </div>
        <Link to="/seller/shop/create" className="btn btn-danger">
          <i className="bi bi-plus-circle me-2"></i>
          Tạo gian hàng mới
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-0">
      {saveMessage.text && (
        <div className={`alert alert-${saveMessage.type} alert-dismissible fade show mx-4`} role="alert">
          {saveMessage.text}
          <button type="button" className="btn-close" onClick={() => setSaveMessage({ type: '', text: '' })}></button>
        </div>
      )}

      <div className="card border-0 shadow-sm mx-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <h5 className="m-0 fw-bold">Thông tin cơ bản</h5>
            </div>
            <div className="d-flex">
              <Link to={`/shop/${selectedShopId}/homepage`} className="btn btn-outline-secondary btn-sm me-2">
                <i className="bi bi-eye me-1"></i>Xem Shop của tôi
              </Link>
              {isEditing ? (
                <div className="btn-group">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-1"></i>Lưu
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setIsEditing(false);
                      setPreviewImage(null);
                      setSelectedFile(null);
                      if (shopDetails) {
                        setShopData({
                          shop_name: shopDetails.shop_name || '',
                          shop_description: shopDetails.shop_description || '',
                          shop_logo: shopDetails.shop_logo || '',
                          shop_address: shopDetails.shop_address || '',
                          shop_email: shopDetails.shop_email || '',
                          shop_phone: shopDetails.shop_phone || ''
                        });
                      }
                      setSaveMessage({ type: '', text: '' });
                    }}
                    disabled={isLoading}
                  >
                    <i className="bi bi-x-circle me-1"></i>Hủy
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="bi bi-pencil me-1"></i>Chỉnh sửa
                </button>
              )}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-8">
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label fw-bold">Tên Shop:</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="shop_name"
                      value={shopData.shop_name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên gian hàng"
                    />
                  ) : (
                    <div className="form-control-plaintext">{shopData.shop_name}</div>
                  )}
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-sm-3 col-form-label fw-bold">Mô tả Shop:</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      name="shop_description"
                      value={shopData.shop_description}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Mô tả về gian hàng của bạn"
                    ></textarea>
                  ) : (
                    <div className="form-control-plaintext" style={{ minHeight: '80px' }}>
                      {shopData.shop_description || 'Chưa có mô tả'}
                    </div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-label fw-bold">Địa chỉ Shop:</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="shop_address"
                      value={shopData.shop_address}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ gian hàng"
                    />
                  ) : (
                    <div className="form-control-plaintext">{shopData.shop_address || 'Chưa có địa chỉ'}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-label fw-bold">Email:</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      name="shop_email"
                      value={shopData.shop_email}
                      onChange={handleInputChange}
                      placeholder="example@domain.com"
                    />
                  ) : (
                    <div className="form-control-plaintext">{shopData.shop_email || 'Chưa có email'}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-label fw-bold">Số điện thoại:</label>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="shop_phone"
                      value={shopData.shop_phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại liên hệ"
                    />
                  ) : (
                    <div className="form-control-plaintext">{shopData.shop_phone || 'Chưa có số điện thoại'}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center">
                <p className="fw-bold mb-2">Logo của Shop</p>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img
                    src={previewImage || shopData.shop_logo || "https://via.placeholder.com/300"}
                    alt="Shop logo"
                    className="img-fluid rounded-circle border"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                </div>
                {isEditing && (
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleImageChange}
                    />
                    <div className="form-text text-muted mt-2 small">
                      <small>Kích thước: 300x300px • Tối đa: 2MB • Định dạng: JPG, JPEG, PNG</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInformation;
