import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const TopSearch = ({ topSearchProducts = [], onPrev, onNext, onZoom, onAddCart, user_id }) => {
	if (!topSearchProducts || topSearchProducts.length === 0) {
		return null; // Don't render anything if no top search products
	}

	return (
		<div style={{ marginBottom: '30px' }}>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '20px',
				borderLeft: '4px solid #dc3545',
				paddingLeft: '10px'
			}}>
				<h4 style={{
					fontSize: '1.5rem',
					fontWeight: '600',
					margin: '0',
					color: '#333'
				}}>
					Sản Phẩm Được Tìm Kiếm Nhiều
				</h4>
				<div>
					<button
						onClick={onPrev}
						style={{
							width: '36px',
							height: '36px',
							borderRadius: '50%',
							border: '1px solid #ddd',
							backgroundColor: 'white',
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: '8px',
							cursor: 'pointer'
						}}
					>
						<i className="bi bi-chevron-left"></i>
					</button>

					<button
						onClick={onNext}
						style={{
							width: '36px',
							height: '36px',
							borderRadius: '50%',
							border: '1px solid #ddd',
							backgroundColor: 'white',
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer'
						}}
					>
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
			</div>

			<Row className="g-3">
				{topSearchProducts.map((product, index) => (
					<Col xs={6} md={3} key={product.id || `top-product-${index}`}>
						<ProductCard
							product={product}
							onZoom={onZoom}
							onAddToCart={onAddCart}
							user_id={user_id}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default TopSearch;