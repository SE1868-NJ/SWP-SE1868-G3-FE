import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardFooter } from 'react-bootstrap';
import { FaSearchPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onZoom, onAddToCart, user_id }) => {
	const navigate = useNavigate();

	const productId = product.id || product._id || product.product_id;

	const handleNavigate = () => {
		if (!productId) {
			return;
		}
		navigate(`/product/${productId}`);
	};

	return (
		<Card className='position-relative'>
			<div
				className='position-absolute top-0 end-0 m-2'
				style={{ cursor: 'pointer' }}
				onClick={() => onZoom(product)}
			>
				<button className='btn btn-danger shadow-lg'>
					<i className='bi bi-zoom-in' />
				</button>
			</div>
			<Card.Img
				variant='top'
				src={product.image_url || product.img}
				style={{ cursor: 'pointer' }}
				onClick={handleNavigate}
			/>

			<Card.Body>
				<Card.Title onClick={handleNavigate} style={{ cursor: 'pointer' }}>
					{product.product_name || product.name}
				</Card.Title>

				<Card.Text>
					{product.sale_price?.toLocaleString() ||
						product.price?.toLocaleString()}{' '}
					VND
				</Card.Text>
			</Card.Body>

			<Card.Footer className='d-flex flex-wrap justify-content-between gap-2'>
				<Button variant='danger' size='sm' className='w-100'>
					Mua Ngay
				</Button>
				<Button
					variant='outline-danger'
					size='sm'
					className='w-100 d-inline'
					onClick={() => onAddToCart(productId, user_id)}
				>
					Thêm vào giỏ hàng
				</Button>
			</Card.Footer>
		</Card>
	);
};

export default ProductCard;
