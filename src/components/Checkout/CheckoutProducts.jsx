import React from "react";

const CheckoutProducts = ({ selectedProducts, formatCurrency, note, setNote }) => {
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
        {/* <div className="d-flex align-items-center mb-3">
          <span className="badge bg-danger me-2 small py-1">Yêu thích</span>
          <span>Shop Mẹ Gấu Máy Hút Sữa</span>
          <button className="btn btn-sm text-teal ms-2 p-0 d-flex align-items-center" style={{ color: '#20B2AA' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Chat ngay
          </button>
        </div> */}

        {selectedProducts.map((product, index) => (
          <div key={index} className="row py-3 border-top align-items-center">
            <div className="col-6 d-flex align-items-center">
              <img
                src={product.image || "https://via.placeholder.com/50"}
                alt={product.name}
                className="me-3 border"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              <div>
                <p className="mb-1 small">{product.name}</p>
                {/* <p className="text-secondary mb-0 small">Loại: 2 Máy</p> */}
              </div>
            </div>
            <div className="col-2 text-center">{product.price}</div>
            <div className="col-2 text-center">{product.quantity}</div>
            <div className="col-2 text-end">{product.price * product.quantity}</div>
          </div>
        ))}

        {/* <div className="py-3 border-top">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="productInsurance" />
            <label className="form-check-label d-flex align-items-center" htmlFor="productInsurance">
              <span className="small">Bảo hiểm Thiệt hại sản phẩm</span>
              <span className="ms-2 text-secondary small">{formatCurrency(5999)}</span>
            </label>
          </div>
          <div className="text-secondary small ms-4 mt-1">
            Bảo vệ sản phẩm được bảo hiểm khỏi thiệt hại do sự cố bất ngờ, tiếp xúc với chất lỏng hoặc hư hỏng trong quá trình sử dụng.
            <a href="#" className="text-primary ms-1">Tìm hiểu thêm</a>
          </div>
        </div> */}

        <div className="py-3 border-top d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center small">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            Voucher của Shop
          </div>
          <div className="d-flex align-items-center">
            <span className="text-danger me-2">-{formatCurrency(100000)}</span>
            <button className="btn btn-link text-primary p-0 text-decoration-none small">
              Chọn Voucher Khác
            </button>
          </div>
        </div>

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