import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddCart, onZoom, user_id, isLoading }) => {
	return (
		<div>
			<div style={{
				display: 'flex',
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
					Tất Cả Sản Phẩm
				</h4>
				{products.length > 0 && (
					<span style={{
						backgroundColor: '#dc3545',
						color: 'white',
						borderRadius: '20px',
						padding: '2px 10px',
						fontSize: '0.9rem',
						marginLeft: '10px',
						fontWeight: '500'
					}}>
					</span>
				)}
			</div>

			{isLoading ? (
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '40px 0'
				}}>
					<Spinner
						animation="border"
						role="status"
						style={{
							color: '#dc3545',
							width: '3rem',
							height: '3rem'
						}}
					/>
					<p style={{ marginTop: '15px', color: '#666' }}>Đang tải sản phẩm...</p>
				</div>
			) : products.length > 0 ? (
				<Row className="g-3">
					{products.map((product, index) => (
						<Col xs={6} md={3} key={product.id || `product-${index}`}>
							<ProductCard
								product={product}
								onZoom={onZoom}
								onAddToCart={onAddCart}
								user_id={user_id}
							/>
						</Col>
					))}
				</Row>
			) : (
				<div style={{
					textAlign: 'center',
					padding: '30px 20px',
					backgroundColor: '#fff9e6',
					borderRadius: '8px',
					border: '1px solid #ffe58f'
				}}>
					<i className="bi bi-search" style={{
						fontSize: '48px',
						color: '#faad14',
						marginBottom: '15px',
						display: 'block'
					}}></i>
					<h5>Không tìm thấy sản phẩm nào</h5>
					<p style={{ color: '#666' }}>
						Vui lòng thử lại với từ khóa khác hoặc xem các sản phẩm khác trong danh mục
					</p>
				</div>
			)}
		</div>
	);
};

export default ProductList;