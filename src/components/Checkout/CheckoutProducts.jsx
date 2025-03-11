import React from "react";

const CheckoutProducts = ({ products, formatCurrency, note, setNote }) => {
  // Nhóm sản phẩm theo shopId
  const groupedProducts = products.reduce((groups, product) => {
    const shopId = product.shopId;
    if (!groups[shopId]) {
      groups[shopId] = {
        shopName: product.storeName,
        shopId: product.shopId,
        products: []
      };
    }
    groups[shopId].products.push(product);
    return groups;
  }, {});

  // Chuyển đổi từ object thành array để map
  const shopGroups = Object.values(groupedProducts);

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header bg-white">
        <div className="row text-secondary small">
          <div className="col-6">Sản phẩm</div>
          <div className="col-2 text-center">Đơn giá</div>
          <div className="col-2 text-center">Số lượng</div>
          <div className="col-2 text-end">Thành tiền</div>
        </div>
      </div>

      <div className="card-body">
        {/* Lặp qua từng nhóm shop */}
        {shopGroups.map((shop, shopIndex) => (
          <div key={shop.shopId} className={shopIndex > 0 ? "mt-4" : ""}>
            {/* Tên shop và nút chat */}
            <div className="d-flex align-items-center mb-3">
              <span className="badge bg-danger me-2 small py-1">Yêu thích</span>
              <span>{shop.shopName}</span>
              <button className="btn btn-sm text-teal ms-2 p-0 d-flex align-items-center" style={{ color: '#20B2AA' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Chat ngay
              </button>
            </div>

            {/* Danh sách sản phẩm cho shop này */}
            {shop.products.map((product) => (
              <div key={product.id} className="row py-3 border-top align-items-center">
                <div className="col-6 d-flex align-items-center">
                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="me-3 border"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                  />
                  <div>
                    <p className="mb-1 small">{product.name}</p>
                    {product.type && <p className="text-secondary mb-0 small">{product.type}</p>}
                  </div>
                </div>
                <div className="col-2 text-center">{formatCurrency(product.price)}</div>
                <div className="col-2 text-center">{product.quantity}</div>
                <div className="col-2 text-end">{formatCurrency(product.price * product.quantity)}</div>
              </div>
            ))}

            {/* Voucher của shop */}
            <div className="py-3 border-top d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center small">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                Voucher của Shop
              </div>
              <div className="d-flex align-items-center">
                <span className="text-danger me-2">-{formatCurrency(0)}</span>
                <button 
                  className="btn btn-link text-primary p-0 text-decoration-none small"
                >
                  Chọn Voucher Khác
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Phần ghi chú - chung cho tất cả */}
        <div className="py-3 border-top">
          <textarea
            className="form-control"
            placeholder="Lưu ý cho Người bán..."
            rows="2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;