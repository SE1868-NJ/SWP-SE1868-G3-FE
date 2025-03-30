import React, { useState } from 'react';
import { Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import ProductCard from './ProductCard';
import NoProductsFound from './NoProductsFound';

const ProductSearch = ({
	products,
	onAddCart,
	onZoom,
	user_id,
	onSortPrice,
	searchTerm,
	isLoading,
	totalProducts,
	onResetFilters
}) => {
	const [sortLabel, setSortLabel] = useState('Sắp xếp theo giá');

	const handleSort = (order) => {
		onSortPrice(order);
		setSortLabel(order === 'asc' ? 'Giá: Thấp đến cao' : 'Giá: Cao xuống thấp');
	};

	// Display loading state
	if (isLoading) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '60px 0'
			}}>
				<Spinner animation="border" style={{ color: '#dc3545', width: '3rem', height: '3rem' }} />
				<p style={{ marginTop: '20px', color: '#666' }}>Đang tải sản phẩm...</p>
			</div>
		);
	}

	// Display empty state when no products found
	if (!isLoading && (!products || products.length === 0)) {
		return <NoProductsFound searchTerm={searchTerm} onReset={onResetFilters} />;
	}

	return (
		<div>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '20px',
				borderBottom: '1px solid #eee',
				paddingBottom: '15px'
			}}>
				<div>
					<h4 style={{
						margin: '0',
						fontSize: '1.25rem',
						fontWeight: '600',
						color: '#333',
						display: 'flex',
						alignItems: 'center'
					}}>
						{searchTerm ? (
							<>
								Kết quả tìm kiếm cho: <span style={{ color: '#dc3545', marginLeft: '5px' }}>"{searchTerm}"</span>
							</>
						) : (
							<>Tất cả sản phẩm</>
						)}

						<span style={{
							backgroundColor: '#dc3545',
							color: 'white',
							borderRadius: '20px',
							padding: '2px 10px',
							fontSize: '0.85rem',
							marginLeft: '10px',
							fontWeight: '500'
						}}>
							{totalProducts}
						</span>
					</h4>
				</div>

				<Dropdown>
					<Dropdown.Toggle variant="light" id="dropdown-sort" size="sm" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
						<i className="bi bi-sort-down" style={{ marginRight: '5px' }}></i>
						{sortLabel}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleSort('asc')} active={sortLabel === 'Giá: Thấp đến cao'}>
							<i className="bi bi-sort-numeric-down" style={{ marginRight: '8px' }}></i>
							Giá từ thấp đến cao
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSort('desc')} active={sortLabel === 'Giá: Cao xuống thấp'}>
							<i className="bi bi-sort-numeric-up-alt" style={{ marginRight: '8px' }}></i>
							Giá từ cao xuống thấp
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<Row className="g-3">
				{products.map((product, index) => (
					<Col xs={6} md={4} lg={3} key={product.id || `product-${index}`}>
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

export default ProductSearch;