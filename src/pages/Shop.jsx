import React from 'react';
import ShopHeader from '../components/Shop/ShopHeader';
import Banner from '../components/Shop/Banner';
import NavigationBar from '../components/Shop/NavigationBar';
import CategorySection from '../components/Shop/CategorySection';
import ProductSection from '../components/Shop/ProductSection';
import Footer from '../components/Shop/Footer';

const Shop = () => {
	return (
		<div style={{
			fontFamily: 'Roboto, sans-serif',
			maxWidth: '1200px',
			margin: '0 auto',
			color: '#222',
			backgroundColor: '#f5f5f5'
		}}>
			<ShopHeader />
			<NavigationBar />
			<Banner />
			<div style={{ display: 'flex' }}>
				<CategorySection />
				<ProductSection />
			</div>
			<Footer />
		</div>
	);
};

export default Shop;