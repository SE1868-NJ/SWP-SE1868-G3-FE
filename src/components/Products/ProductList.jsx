// import React from 'react';
// import { Row, Col, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddCart, onZoom, user_id }) => {
	return (
		<div>
			<h4 className='mt-4 d-flex justify-content-between align-items-center'>
				Tất Cả Sản Phẩm
				{/* <Dropdown>
          <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
            Lọc theo giá
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onPriceRangeChange([0, 500])}>
              Dưới 500 VND
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onPriceRangeChange([500, 1000])}>
              500 - 1000 VND
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onPriceRangeChange([0, 1000])}>
              Tất cả
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
			</h4>
			<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
				{products.map((product, index) => (
					<div className='col' key={index}>
						<ProductCard
							product={product}
							onZoom={onZoom}
							onAddToCart={onAddCart}
							user_id={user_id}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

ProductList.propTypes = {
	products: PropTypes.array,
};

export default ProductList;
