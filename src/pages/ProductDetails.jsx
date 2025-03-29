import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductImages from '../components/Products/ProductImages';
import ProductInfo from '../components/Products/ProductInfo';
import ProductTabs from '../components/Products/ProductTabs';
import ShopInfo from '../components/Products/ShopInfo';
import { productService } from '../services/productService';
import { useAuth } from '../hooks/contexts/AuthContext';
import NotificationToast from '../components/Toast/NotificationToast';

const ProductDetail = () => {
	const { id } = useParams();
	const { user, handleAddCart, showToast, toastMessage, toastVariant, setShowToast } = useAuth();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			setError(null);
			setProduct(null);
			try {
				const response = await productService.getProductById(id);
				if (response) {
					setProduct(response);
					setQuantity(1);
				} else {
					setError('Không tìm thấy sản phẩm.');
				}
			} catch (err) {
				console.error("Error fetching product:", err);
				setError('Đã xảy ra lỗi khi tải sản phẩm.');
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProduct();
		} else {
			setError('ID sản phẩm không hợp lệ.');
			setLoading(false);
		}
	}, [id]);

	const handleQuantityChange = (value) => {
		const maxStock = product?.stock_quantity ?? 0;
		setQuantity(Math.max(1, Math.min(value, maxStock > 0 ? maxStock : 1)));
	};

	if (loading) {
		return (
			<Container className='text-center mt-5 vh-100 d-flex justify-content-center align-items-center'>
				<div>
					<Spinner animation="border" variant="danger" style={{ width: '3rem', height: '3rem' }} />
					<p className='mt-3 text-muted'>Đang tải dữ liệu sản phẩm...</p>
				</div>
			</Container>
		);
	}

	if (error) {
		return (
			<Container className='text-center mt-5 vh-100 d-flex justify-content-center align-items-center'>
				<div className="alert alert-danger">
					<i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
				</div>
			</Container>
		);
	}

	const imageList = product.images && product.images.length > 0
		? product.images.map(img => img.url || img)
		: product.image_url ? [product.image_url] : [];

	return (
		<Container className='mt-4 mb-5' style={{ maxWidth: '1200px' }}>
			<Row className='g-4'>
				{imageList.length > 0 && (
					<Col lg={5} md={6}>
						<ProductImages images={imageList} />
					</Col>
				)}
				<Col lg={imageList.length > 0 ? 7 : 12} md={imageList.length > 0 ? 6 : 12}>
					<ProductInfo
						product={product}
						quantity={quantity}
						onQuantityChange={handleQuantityChange}
						onAddToCart={handleAddCart}
						user_id={user?.id}
					/>
				</Col>
			</Row>

			{product.shop && <ShopInfo shop={product.shop} />}

			<ProductTabs product={product} />

			<NotificationToast
				show={showToast}
				message={toastMessage}
				variant={toastVariant}
				onClose={() => setShowToast(false)}
			/>
		</Container>
	);
};

export default ProductDetail;