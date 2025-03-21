import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h5 className="mb-0">Sản Phẩm Gần Đây</h5>
        <a href="#" className="btn btn-sm btn-outline-primary">Xem Tất Cả</a>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sản Phẩm</th>
                <th>Giá</th>
                <th>Tồn Kho</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;