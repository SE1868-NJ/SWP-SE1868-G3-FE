import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopHeader from '../components/Shop/ShopHeader';
import Banner from '../components/Shop/Banner';
import ShopFooter from '../components/Shop/ShopFooter';
import CategorySection from '../components/Shop/CategorySection';
import ProductSection from '../components/Shop/ProductSection';
import { shopService } from '../services/shopService';

function ShopPage() {
	const { id } = useParams();
	const [activeCategory, setActiveCategory] = useState('TẤT CẢ SẢN PHẨM');
	const [shopData, setShopData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchShopData = async () => {
			try {
				setLoading(true);
				const response = await shopService.getShopHomepage(id);
				if (response?.status === "success" && response?.data) {
					setShopData(response.data);
				}
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};
		fetchShopData();
	}, [id]);

	const handleNavigation = (category) => {
		setActiveCategory(category);
	};

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<div>
					<h3>Đang tải thông tin shop...</h3>
				</div>
			</div>
		);
	}

	if (!shopData) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<div style={{ textAlign: 'center' }}>
					<h3>Không thể tải thông tin shop</h3>
					<p>Vui lòng thử lại sau.</p>
					<button
						onClick={() => window.location.reload()}
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

	return (
		<div style={{ backgroundColor: '#f5f5f5' }}>
			<div style={{ backgroundColor: 'rgb(245, 245, 245)', overflow: 'hidden' }}>
				<ShopHeader
					activeCategory={activeCategory}
					onCategoryChange={handleNavigation}
					shopInfo={shopData.shopInfo}
					categories={shopData.categories || []}
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
					shopId={id}
				/>
			</div>

			<div style={{
				backgroundColor: 'rgb(245, 245, 245)',
				boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
				overflow: 'hidden'
			}}>
				<ShopFooter shopInfo={shopData.shopInfo} />
			</div>
		</div>
	);
}

export default ShopPage;