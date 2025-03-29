import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

const TopSearch = ({ topSearchProducts = [], onPrev, onNext }) => {

	return (
		<>
			<h4 className='mt-4 d-flex justify-content-between align-items-center'>
				Top Search
			</h4>
			<Row>
				{topSearchProducts.length > 0 ? (
					topSearchProducts.map((product, index) => (
						<Col key={product.id || index} xs={6} md={3} className='mb-3'>
							<ProductCard product={product} />
						</Col>
					))
				) : (
					<Col xs={12}>
						<p className='text-muted'>Không có dữ liệu top search.</p>
					</Col>
				)}
			</Row>
		</>
	);
};

export default TopSearch;
