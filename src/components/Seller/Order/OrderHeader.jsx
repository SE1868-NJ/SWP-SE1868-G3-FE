import React from 'react';

const OrderHeader = ({ title, subtitle, searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <>
      <div className='mb-3'>
        <h2 className='fw-bold'>{title}</h2>
        <p className='text-muted fst-italic'>{subtitle}</p>
      </div>

      <div className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nhập tên hoặc mã đơn hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>
    </>
  );
};

export default OrderHeader;