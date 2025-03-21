import React from 'react';
import ShopInformation from '../../../components/Seller/Shop/ShopInformation';

function ShopInfoPage() {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center bg-white p-3 border-bottom">
        <div className="d-flex align-items-center">
          <i className="bi bi-shop fs-4 text-danger me-2"></i>
          <h4 className="m-0">Thông tin gian hàng</h4>
        </div>
      </div>
      <ShopInformation />
    </div>
  );
}

export default ShopInfoPage;