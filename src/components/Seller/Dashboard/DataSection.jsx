import React from 'react';
import ProductRankingTable from './ProductRankingTable';
import OrderTable from './OrderTable';

const DataSection = ({ rankingProducts, orders }) => {
  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <ProductRankingTable initialProducts={rankingProducts} />
      </div>
      <div className="col-md-6 mb-4">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default DataSection;