import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShopHeader from '../components/Shop/ShopHeader';
import Banner from '../components/Shop/Banner';
import ShopFooter from '../components/Shop/ShopFooter';
import CategorySection from '../components/Shop/CategorySection';
import ProductSection from '../components/Shop/ProductSection';
import { shopService } from '../services/shopService';

function Shop() {
	const { id } = useParams();
	const navigate = useNavigate();
	const shopId = id || '1';
	const [activeCategory, setActiveCategory] = useState('TẤT CẢ SẢN PHẨM');
	const [shopData, setShopData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchShopData = async () => {
			try {
				setLoading(true);

				const response = await shopService.getShopHomepage(shopId);

				if (!isMounted) return;

				if (response?.data) {
					if (response.data.status === "success" && response.data.data) {
						setShopData(response.data.data);
					} else if (response.data.shopInfo) {
						setShopData(response.data);
					} else {
						setError('Cấu trúc dữ liệu không đúng định dạng');
					}
				} else {
					setError('Không nhận được dữ liệu từ API');
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message || 'Không thể tải dữ liệu shop');
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchShopData();

		// Cleanup function để tránh memory leak
		return () => {
			isMounted = false;
		};
	}, [shopId]);

	const handleNavigation = (category) => {
		setActiveCategory(category);
	};

	const handleRetry = () => {
		window.location.reload();
	};

	const handleGoToDefaultShop = () => {
		navigate('/shop/1');
	};

	if (loading) {
		return renderLoadingState(shopId);
	}

	if (error) {
		return renderErrorState(error, shopId, handleRetry);
	}

	if (!shopData) {
		return renderNotFoundState(shopId, handleGoToDefaultShop);
	}

	return (
		<div style={{ backgroundColor: '#f5f5f5' }}>
			<div style={{ backgroundColor: 'rgb(245, 245, 245)', overflow: 'hidden' }}>
				<ShopHeader
					activeCategory={activeCategory}
					onCategoryChange={handleNavigation}
					shopInfo={shopData.shopInfo}
					categories={shopData.categories || []}  // Thêm truyền categories
				/>
			</div>

			<Banner banners={shopData.banners || []} />

			<div style={{ display: 'flex', gap: '20px', margin: '20px 15px' }}>
				<CategorySection
					activeCategory={activeCategory}
					onCategoryChange={handleNavigation}
					categories={shopData.categories || []}
				/>
				<ProductSection
					category={activeCategory}
					shopId={shopId}
				/>
			</div>

			<div style={{
				backgroundColor: 'rgb(245, 245, 245)',
				boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
				overflow: 'hidden'
			}}>
				<ShopFooter />
			</div>
		</div>
	);
}

function renderLoadingState(shopId) {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<div>
				<h3>Đang tải thông tin shop...</h3>
				<p>Shop ID: {shopId}</p>
			</div>
		</div>
	);
}

function renderErrorState(error, shopId, onRetry) {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
			<div>
				<h3>Đã xảy ra lỗi</h3>
				<p>{error}</p>
				<p>Shop ID: {shopId}</p>
				<button
					onClick={onRetry}
					style={{
						padding: '8px 16px',
						backgroundColor: '#ee4d2d',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						marginTop: '10px'
					}}
				>
					Thử lại
				</button>
			</div>
		</div>
	);
}

function renderNotFoundState(shopId, onGoToDefault) {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<div>
				<h3>Shop không tồn tại</h3>
				<p>Shop ID: {shopId}</p>
				<button
					onClick={onGoToDefault}
					style={{
						padding: '8px 16px',
						backgroundColor: '#ee4d2d',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						marginTop: '10px'
					}}
				>
					Quay lại trang shop mặc định
				</button>
			</div>
		</div>
	);
}

export default Shop;