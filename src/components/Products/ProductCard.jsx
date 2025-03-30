import React, { memo } from 'react';
import { Button, Card } from 'react-bootstrap';
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

	const handleBuyNow = (e) => {
		e.stopPropagation();
		if (onAddToCart && productId) {
			onAddToCart(productId, user_id);
			navigate('/cart'); // Navigate to cart page after adding the product
		}
	};

	const handleAddToCart = (e) => {
		e.stopPropagation();
		if (onAddToCart && productId) {
			onAddToCart(productId, user_id);
		}
	};

	const handleZoom = (e) => {
		e.stopPropagation();
		if (onZoom) {
			onZoom(product);
		}
	};

	// Format price with dot separator (e.g., 20.000 VND)
	const formatPrice = (price) => {
		return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
	};

	return (
		<Card style={{
			height: "100%",
			border: "none",
			boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
			borderRadius: "8px",
			overflow: "hidden",
			transition: "transform 0.2s ease, box-shadow 0.2s ease"
		}}>
			{/* Quick view button */}
			<div style={{
				position: "absolute",
				top: "8px",
				right: "8px",
				zIndex: 2
			}}>
				<Button
					variant="light"
					size="sm"
					style={{
						borderRadius: "50%",
						padding: "8px",
						boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
					}}
					onClick={handleZoom}
				>
					<i className="bi bi-zoom-in"></i>
				</Button>
			</div>

			{/* Product image */}
			<div
				onClick={handleNavigate}
				style={{
					cursor: 'pointer',
					overflow: "hidden"
				}}
			>
				<Card.Img
					variant="top"
					src={product.image_url || product.img}
					style={{
						height: "220px",
						objectFit: "cover",
						transition: "transform 0.3s ease"
					}}
				/>
			</div>

			<Card.Body style={{
				display: "flex",
				flexDirection: "column",
				padding: "16px"
			}}>
				{/* Product name */}
				<Card.Title
					onClick={handleNavigate}
					style={{
						fontSize: "1.4rem",
						fontWeight: "500",
						cursor: "pointer",
						marginBottom: "4px"
					}}
				>
					<div style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						lineHeight: "1.3",
						height: "2.6em"
					}}>
						{product.product_name || product.name}
					</div>
				</Card.Title>

				{/* Product price */}
				<Card.Text style={{
					color: "#dc3545",
					fontWeight: "bold",
					fontSize: "1.25rem",
					marginTop: "8px",
					marginBottom: "12px"
				}}>
					{formatPrice(product.sale_price || product.price)} VND
				</Card.Text>

				{/* If there's stock information, show it */}
				{product.stock_quantity !== undefined && (
					<div style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "8px",
						color: "#6c757d",
						fontSize: "0.875rem"
					}}>
						<i className="bi bi-box-seam" style={{ marginRight: "4px" }}></i>
						<span>Còn lại: {product.stock_quantity}</span>
					</div>
				)}

				{/* Action buttons */}
				<div style={{ marginTop: "auto" }}>
					<div style={{
						display: "grid",
						gap: "8px"
					}}>
						<Button
							variant="danger"
							style={{
								borderRadius: "999px"
							}}
							onClick={handleBuyNow}
						>
							<i className="bi bi-bag-check" style={{ marginRight: "8px" }}></i>
							Mua Ngay
						</Button>
						<Button
							variant="outline-danger"
							style={{
								borderRadius: "999px"
							}}
							onClick={handleAddToCart}
						>
							<i className="bi bi-cart-plus" style={{ marginRight: "8px" }}></i>
							Thêm vào giỏ hàng
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ProductCard);