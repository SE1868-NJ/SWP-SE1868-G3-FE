import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductPreview from '../components/Modals/ProductPreview';
import Advertisement from '../components/Products/Advertisement';
import Categories from '../components/Products/Categories';
import CustomPagination from '../components/Pagination/CustomPagination';
import FlashSale from '../components/Products/FlashSale';
import ProductList from '../components/Products/ProductList';
import TopSearch from '../components/Products/TopSearch';
import NotificationToast from '../components/Toast/NotificationToast';
import { useAuth } from '../hooks/contexts/AuthContext';
import { productService } from '../services/productService';

const categories = ['Đồ ăn', 'Đồ uống', 'Đồ tươi sống', 'Đồ chay'];
const images = [
	'https://www.eamgroup.vn/Huu-ich/Images/Post/49OAqx2503.jpg',
	'https://i.ytimg.com/vi/C1P1Cw9J1-I/maxresdefault.jpg',
	'https://example.com/image3.jpg',
];

const itemsPerPage = 8;
const flashSaleItems = 4;
const topSearchItems = 4;

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ListPage() {
	const query = useQuery();
	const navigate = useNavigate();
	const selectedCategory = query.get('category') || '';
	const [currentPage, setCurrentPage] = useState(1);
	const [flashSaleIndex, setFlashSaleIndex] = useState(0);
	const [topSearchIndex, setTopSearchIndex] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showDetail, setShowDetail] = useState(false);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [topSearchProducts, setTopSearchProducts] = useState([]);
	const {
		handleAddCart,
		showToast,
		user,
		toastMessage,
		toastVariant,
		setShowToast,
	} = useAuth();

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	useEffect(() => {
		fetchTopSearchProducts();
	}, []); // Chỉ gọi một lần khi mount

	const fetchProducts = async () => {
		try {
			const params = { page: currentPage, limit: itemsPerPage };
			const response = await productService.getProducts(params);
			setProducts(response.items);
			setTotalPages(response.metadata.totalPages);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	const fetchTopSearchProducts = async () => {
		try {
			const products = await productService.getTopSearchedProducts(0, 4); // Thử search_count=0 để lấy nhiều hơn
			console.log('Raw products from API:', products);
			if (products && products.length > 0) {
				const sortedProducts = products.sort(
					(a, b) => (b.search_count || 0) - (a.search_count || 0),
				);
				const top4Products = sortedProducts.slice(0, 4); // Lấy top 4
				console.log('Top 4 sorted products:', top4Products);
				setTopSearchProducts(top4Products);
			} else {
				console.warn('No top search products available');
				setTopSearchProducts([]);
			}
		} catch (error) {
			console.error('Error fetching top searched products:', error);
			setTopSearchProducts([]);
		}
	};
	const handleFlashSaleNext = () => {
		if (flashSaleIndex + flashSaleItems < products.length) {
			setFlashSaleIndex(flashSaleIndex + 1);
		}
	};

	const handleFlashSalePrev = () => {
		if (flashSaleIndex > 0) {
			setFlashSaleIndex(flashSaleIndex - 1);
		}
	};

	const handleTopSearchNext = () => {
		if (topSearchIndex + topSearchItems < topSearchProducts.length) {
			setTopSearchIndex(topSearchIndex + 1);
		}
	};

	const handleTopSearchPrev = () => {
		if (topSearchIndex > 0) {
			setTopSearchIndex(topSearchIndex - 1);
		}
	};

	// const handleCategorySelect = (category) => {
	// 	navigate(`/products?category=${encodeURIComponent(category)}`);
	// };

	const handleOpenDetail = (product) => {
		setSelectedProduct(product);
		setShowDetail(true);
	};

	const handleCloseDetail = () => {
		setSelectedProduct(null);
		setShowDetail(false);
	};
	const handleCategorySelect = (category) => {
		navigate(`/search?category=${encodeURIComponent(category)}`);
	};

	return (
		<>
			<Advertisement images={images} />
			<Categories
				categories={categories}
				// selectedCategory={selectedCategory}
				onCategorySelect={handleCategorySelect}
			/>
			<FlashSale
				products={products.slice(
					flashSaleIndex,
					flashSaleIndex + flashSaleItems,
				)}
				onPrev={handleFlashSalePrev}
				onNext={handleFlashSaleNext}
				onZoom={handleOpenDetail}
			/>
			<TopSearch
				topSearchProducts={topSearchProducts.slice(
					topSearchIndex,
					topSearchIndex + topSearchItems,
				)}
				onPrev={handleTopSearchPrev}
				onNext={handleTopSearchNext}
			/>
			<ProductList
				products={products}
				onAddCart={handleAddCart}
				onZoom={handleOpenDetail}
				user_id={user.id}
			/>
			<CustomPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
			<ProductPreview
				showDetail={showDetail}
				handleCloseDetail={handleCloseDetail}
				selectedProduct={selectedProduct}
			/>
			<NotificationToast
				show={showToast}
				message={toastMessage}
				variant={toastVariant}
				onClose={() => setShowToast(false)}
			/>
		</>
	);
}

export default ListPage;
