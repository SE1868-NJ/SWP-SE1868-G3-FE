import React, { useState, useEffect } from 'react';
import { useSeller } from '../../../hooks/contexts/SellerContext';
import { Link } from 'react-router-dom';
import { shopService } from '../../../services/shopService';

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

  // Cập nhật dữ liệu shop khi có thay đổi
  const updateShopData = (shop) => {
    if (!shop) return;

    setSelectedShopId(shop.shop_id);
    setShopDetails(shop);
    setShopData({
      shop_name: shop.shop_name || '',
      shop_description: shop.shop_description || '',
      shop_logo: shop.shop_logo || '',
      shop_address: shop.shop_address || '',
      shop_email: shop.shop_email || '',
      shop_phone: shop.shop_phone || ''
    });
  };

  // Reset trạng thái chỉnh sửa
  const resetEditState = () => {
    setIsEditing(false);
    setPreviewImage(null);
    setSelectedFile(null);
    setSaveMessage({ type: '', text: '' });
  };

  // Nạp dữ liệu shop ban đầu
  useEffect(() => {
    if (shops && shops.length > 0) {
      updateShopData(shops[0]);
    }
  }, [shops]);

  // Xử lý khi chọn shop khác
  const handleShopChange = (e) => {
    const shopId = e.target.value;
    const selectedShop = shops.find(shop => shop.shop_id.toString() === shopId.toString());

    if (selectedShop) {
      updateShopData(selectedShop);
    }

    resetEditState();
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý thay đổi ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra kích thước file
    if (file.size > 2 * 1024 * 1024) {
      setSaveMessage({
        type: 'danger',
        text: 'Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 2MB.'
      });
      return;
    }

    // Kiểm tra định dạng file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setSaveMessage({
        type: 'danger',
        text: 'Định dạng file không hợp lệ. Chỉ chấp nhận JPG, JPEG, PNG.'
      });
      return;
    }

    setSelectedFile(file);

    // Hiển thị preview ảnh
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    setSaveMessage({ type: '', text: '' });
  };

  // Xử lý lưu thông tin
  const handleSave = async () => {
    // Validate dữ liệu
    if (!shopData.shop_name.trim()) {
      setSaveMessage({ type: 'danger', text: 'Tên shop không được để trống' });
      return;
    }

    try {
      setIsLoading(true);

      // Chuẩn bị dữ liệu để gửi
      const formData = new FormData();
      Object.entries(shopData).forEach(([key, value]) => {
        if (key !== 'shop_logo') {
          formData.append(key, value || '');
        }
      });

      // Thêm file nếu có
      if (selectedFile) {
        formData.append('shop_logo', selectedFile);
      }

      // Gọi API cập nhật
      const updatedShop = await shopService.updateShop(selectedShopId, formData);

      // Cập nhật UI
      setIsLoading(false);
      setIsEditing(false);
      setPreviewImage(null);
      setSelectedFile(null);

      // Cập nhật dữ liệu shop
      setShopDetails(updatedShop);
      setShopData({
        shop_name: updatedShop.shop_name || '',
        shop_description: updatedShop.shop_description || '',
        shop_logo: updatedShop.shop_logo || '',
        shop_address: updatedShop.shop_address || '',
        shop_email: updatedShop.shop_email || '',
        shop_phone: updatedShop.shop_phone || ''
      });

      // Hiển thị thông báo thành công (quan trọng: đặt ở đây để đảm bảo hiển thị sau khi cập nhật)
      setSaveMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
    } catch (error) {
      setIsLoading(false);
      setSaveMessage({ type: 'danger', text: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
      console.error("Save error:", error);
    }
  };

  // Hủy chỉnh sửa
  const handleCancel = () => {
    resetEditState();
    if (shopDetails) {
      updateShopData(shopDetails);
    }
  };

  // Hiển thị màn hình loading
  if (isLoading && !shopDetails) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">Đang tải thông tin gian hàng...</p>
      </div>
    );
  }

  // Hiển thị thông báo khi không có shop
  if (!shopDetails && shops.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Không tìm thấy gian hàng nào. Vui lòng tạo gian hàng mới.
        </div>
        <Link to="/seller/shop/create" className="btn btn-danger">
          <i className="bi bi-plus-circle me-2"></i>
          Tạo gian hàng mới
        </Link>
      </div>
    );
  }

  // Render phần form thông tin
  const renderFormField = (label, name, placeholder, type = "text", rows = null) => {
    return (
      <div className="row mb-3">
        <label className="col-sm-3 col-form-label fw-bold">{label}:</label>
        <div className="col-sm-9">
          {isEditing ? (
            rows ? (
              <textarea
                className="form-control"
                name={name}
                value={shopData[name]}
                onChange={handleInputChange}
                rows={rows}
                placeholder={placeholder}
              ></textarea>
            ) : (
              <input
                type={type}
                className="form-control"
                name={name}
                value={shopData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
              />
            )
          ) : (
            <div className="form-control-plaintext">
              {shopData[name] || `Chưa có ${label.toLowerCase()}`}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render nút lưu/hủy hoặc chỉnh sửa
  const renderActionButtons = () => {
    if (isEditing) {
      return (
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
            onClick={handleCancel}
            disabled={isLoading}
          >
            <i className="bi bi-x-circle me-1"></i>Hủy
          </button>
        </div>
      );
    }

    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => setIsEditing(true)}
      >
        <i className="bi bi-pencil me-1"></i>Chỉnh sửa
      </button>
    );
  };

  // Render UI chính
  return (
    <div className="container-fluid py-4 px-0">
      {/* Thông báo */}
      {saveMessage.text && (
        <div className={`alert alert-${saveMessage.type} alert-dismissible fade show mx-4 border-0 shadow-sm`} role="alert">
          <i className={`bi ${saveMessage.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
          {saveMessage.text}
          <button type="button" className="btn-close" onClick={() => setSaveMessage({ type: '', text: '' })}></button>
        </div>
      )}

      {/* Card thông tin */}
      <div className="card border-0 shadow-sm mx-4 rounded-3">
        <div className="card-header bg-white py-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-bold">
              <i className="bi bi-info-circle me-2 text-danger"></i>
              Thông tin cơ bản
            </h5>
            <div className="d-flex">
              <Link to={`/shop/${selectedShopId}/homepage`} className="btn btn-outline-secondary btn-sm me-2">
                <i className="bi bi-eye me-1"></i>Xem Shop của tôi
              </Link>
              {renderActionButtons()}
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row g-4">
            {/* Thông tin cơ bản bên trái */}
            <div className="col-md-8">
              {renderFormField("Tên Shop", "shop_name", "Nhập tên gian hàng")}
              {renderFormField("Mô tả Shop", "shop_description", "Mô tả về gian hàng của bạn", "text", 5)}
              {renderFormField("Địa chỉ Shop", "shop_address", "Nhập địa chỉ gian hàng")}
              {renderFormField("Email", "shop_email", "example@domain.com", "email")}
              {renderFormField("Số điện thoại", "shop_phone", "Nhập số điện thoại liên hệ", "tel")}
            </div>

            {/* Logo shop bên phải */}
            <div className="col-md-4">
              <div className="text-center">
                <p className="fw-bold mb-2">Logo của Shop</p>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img
                    src={previewImage ||
                      (shopData.shop_logo ? `http://localhost:4000${shopData.shop_logo}` : "https://via.placeholder.com/300")}
                    alt="Shop logo"
                    className="img-fluid rounded-circle border"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.error("Lỗi tải ảnh:", e);
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300";
                    }}
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