import React, { useState, useEffect } from 'react';

const ProductRankingTable = ({ initialProducts = [], activeTab, onTabChange }) => {
  const [products, setProducts] = useState([]);

  // Sử dụng active tab từ parent thay vì local state
  const viewMode = activeTab || 'revenue';

  useEffect(() => {
    if (initialProducts.length === 0) return;

    let sortedProducts = [...initialProducts];

    if (viewMode === 'revenue') {
      sortedProducts.sort((a, b) => b.revenue - a.revenue);
    } else {
      sortedProducts.sort((a, b) => b.total_quantity - a.total_quantity);
    }

    setProducts(sortedProducts.slice(0, 5));
  }, [viewMode, initialProducts]);

  const handleModeChange = (mode) => {
    console.log("Chuyển mode sang:", mode);
    // Gọi hàm từ parent component
    if (onTabChange) {
      onTabChange(mode);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', 'đ');
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h4 className="mb-0 fw-bold" style={{ color: '#2c3e50' }}>Thứ hạng sản phẩm</h4>
      </div>

      <div className="card-body pb-0">
        <div className="row mb-2">
          <div className="col-12">
            <ul className="nav nav-pills">
              <li className="nav-item me-2">
                <button
                  className={`nav-link ${viewMode === 'revenue' ? 'active' : ''}`}
                  onClick={() => handleModeChange('revenue')}
                  style={{
                    fontWeight: 500,
                    backgroundColor: viewMode === 'revenue' ? '#34495e' : 'transparent',
                    color: viewMode === 'revenue' ? 'white' : '#34495e'
                  }}
                >
                  <i className={`bi bi-currency-dollar me-1`}></i>
                  Theo doanh thu
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${viewMode === 'quantity' ? 'active' : ''}`}
                  onClick={() => handleModeChange('quantity')}
                  style={{
                    fontWeight: 500,
                    backgroundColor: viewMode === 'quantity' ? '#34495e' : 'transparent',
                    color: viewMode === 'quantity' ? 'white' : '#34495e'
                  }}
                >
                  <i className={`bi bi-box-seam me-1`}></i>
                  Theo số sản phẩm
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-body pt-0">
        {viewMode === 'revenue' ? (
          <div className="py-2">
            <p className="mb-3 text-muted small">5 sản phẩm có tổng doanh số cao nhất (tính trên các đơn hàng đã đặt) trong khoảng thời gian đã chọn.</p>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr style={{ backgroundColor: '#ecf0f1' }}>
                    <th width="60">#</th>
                    <th>Sản Phẩm</th>
                    <th className="text-end">Tổng Doanh Thu</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{index + 1}</td>
                      <td>{product.Product ? product.Product.product_name : 'Tên sản phẩm không có'}</td>
                      <td className="text-end fw-medium" style={{ color: '#2c3e50' }}>
                        {product.revenue ? formatCurrency(product.revenue) : '0 đ'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <p className="mb-3 text-muted small">5 sản phẩm bán chạy nhất của Shop theo tổng số lượng sản phẩm đã bán trong khoảng thời gian được chọn.</p>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr style={{ backgroundColor: '#ecf0f1' }}>
                    <th width="60">#</th>
                    <th>Sản Phẩm</th>
                    <th className="text-end">Số Lượng Đã Bán</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{index + 1}</td>
                      <td>{product.Product ? product.Product.product_name : 'Tên sản phẩm không có'}</td>
                      <td className="text-end fw-medium" style={{ color: '#2c3e50' }}>
                        {parseInt(product.total_quantity) || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRankingTable;