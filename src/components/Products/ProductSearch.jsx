import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductSearch = ({
	products,
	onAddCart,
	onZoom,
	user_id,
	onSortPrice,
	searchTerm,
}) => {
	const [sortLabel, setSortLabel] = useState('Sắp xếp theo giá');

	const handleSort = (order) => {
		onSortPrice(order);
		if (order === 'asc') {
			setSortLabel('Giá: Thấp đến cao');
		} else {
			setSortLabel('Giá: Cao xuống thấp');
		}
	};

	return (
		<div>
			<h4 className='mt-4 d-flex justify-content-between align-items-center'>
				Kết quả tìm kiếm cho từ khóa "{searchTerm}"
				<Dropdown>
					<Dropdown.Toggle variant='outline-danger' id='dropdown-basic'>
						{sortLabel}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleSort('asc')}>
							Giá từ thấp đến cao
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSort('desc')}>
							Giá từ cao xuống thấp
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</h4>
			<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4'>
				{products.length > 0 ? (
					products.map((product, index) => (
						<div className='col mb-4' key={index}>
							<ProductCard
								product={product}
								onZoom={onZoom}
								onAddToCart={onAddCart}
								user_id={user_id}
							/>
						</div>
					))
				) : (
					<p className='text-center w-100'>Không tìm thấy sản phẩm nào.</p>
				)}
			</div>
		</div>
	);
};

ProductSearch.propTypes = {
	products: PropTypes.array.isRequired,
	onAddCart: PropTypes.func,
	onZoom: PropTypes.func,
	user_id: PropTypes.string,
	onSortPrice: PropTypes.func.isRequired,
	searchTerm: PropTypes.string.isRequired,
};

export default ProductSearch;
