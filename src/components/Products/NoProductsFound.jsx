import React from 'react';

const NoProductsFound = ({ searchTerm, onReset }) => {
  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: '#fff9e6',
      borderRadius: '12px',
      border: '1px solid #ffe58f',
      margin: '20px auto',
      maxWidth: '600px'
    }}>
      <i className="bi bi-search" style={{
        fontSize: '48px',
        color: '#faad14',
        marginBottom: '16px',
        display: 'block'
      }}></i>

      <h3 style={{ marginBottom: '12px', color: '#333' }}>
        Không tìm thấy sản phẩm nào phù hợp
      </h3>

      {searchTerm && (
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Không tìm thấy kết quả nào cho <strong>"{searchTerm}"</strong>
        </p>
      )}

      <p style={{ color: '#666', marginBottom: '24px' }}>
        Vui lòng thử lại với từ khóa khác hoặc thay đổi bộ lọc tìm kiếm
      </p>

      {onReset && (
        <button
          onClick={onReset}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <i className="bi bi-arrow-counterclockwise" style={{ marginRight: '8px' }}></i>
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
};

export default NoProductsFound;