import React from 'react';
import ProductTable from './ProductTable';
import OrderTable from './OrderTable';

const DataSection = ({ products, orders }) => {
  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <ProductTable products={products} />
      </div>
      <div className="col-md-6 mb-4">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default DataSection;