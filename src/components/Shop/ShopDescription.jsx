import React, { useState } from 'react';

const ShopDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  const isLongDescription = description.length > 300;
  const displayText = expanded ? description : (isLongDescription ? `${description.substring(0, 300)}...` : description);

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px 25px',
      margin: '0 0 15px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8e8e8',
      borderTop: 'none',
      fontSize: '14px',
      color: '#333',
      lineHeight: '1.6'
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '10px',
        color: '#333'
      }}>
        Giới Thiệu Cửa Hàng
      </h4>

      <div style={{ whiteSpace: 'pre-line' }}>
        {displayText}
      </div>

      {isLongDescription && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ee4d2d',
            fontWeight: '600',
            cursor: 'pointer',
            padding: '8px 0',
            fontSize: '14px'
          }}
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export default ShopDescription;