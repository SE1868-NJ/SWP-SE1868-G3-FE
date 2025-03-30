import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductPreview from '../components/Modals/ProductPreview';
import Advertisement from '../components/Products/Advertisement';
import Categories from '../components/Products/Categories';
import CustomPagination from '../components/Pagination/CustomPagination';
import ProductList from '../components/Products/ProductList';
import TopSearch from '../components/Products/TopSearch';
import NotificationToast from '../components/Toast/NotificationToast';
import { useAuth } from '../hooks/contexts/AuthContext';
import { productService } from '../services/productService';

// Fixed banner images - can be updated with actual images from database
const bannerImages = [
	'https://www.eamgroup.vn/Huu-ich/Images/Post/49OAqx2503.jpg',
	'https://i.ytimg.com/vi/C1P1Cw9J1-I/maxresdefault.jpg',
];

const itemsPerPage = 8;
const topSearchItems = 4;

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ListPage() {
	const query = useQuery();
	const navigate = useNavigate();
	const selectedCategory = query.get('category') || '';
	const [currentPage, setCurrentPage] = useState(1);
	const [topSearchIndex, setTopSearchIndex] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showDetail, setShowDetail] = useState(false);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [topSearchProducts, setTopSearchProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { handleAddCart, user, showToast, toastMessage, toastVariant, setShowToast } = useAuth();

	// Fetch categories from API
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await productService.getCategories();
				if (response && Array.isArray(response)) {
					setCategories(response.map(cat => cat.category_name || cat.name));
				} else {
					// Fallback categories if API fails
					setCategories(['Đồ ăn', 'Đồ uống', 'Đồ tươi sống', 'Đồ chay']);
				}
			} catch (error) {
				console.error('Error fetching categories:', error);
				// Fallback categories
				setCategories(['Đồ ăn', 'Đồ uống', 'Đồ tươi sống', 'Đồ chay']);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [currentPage, selectedCategory]);

	useEffect(() => {
		fetchTopSearchProducts();
	}, []); // Only call once when mounted

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const params = { page: currentPage, limit: itemsPerPage };
			if (selectedCategory) {
				params.category = selectedCategory;
			}
			const response = await productService.getProducts(params);
			setProducts(response.items);
			setTotalPages(response.metadata.totalPages);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching products:', error);
			setIsLoading(false);
		}
	};

	const fetchTopSearchProducts = async () => {
		try {
			const products = await productService.getTopSearchedProducts(0, 4);

			if (products && products.length > 0) {
				const sortedProducts = products.sort(
					(a, b) => (b.search_count || 0) - (a.search_count || 0),
				);
				const top4Products = sortedProducts.slice(0, 4); // Get top 4
				setTopSearchProducts(top4Products);
			} else {
				setTopSearchProducts([]);
			}
		} catch (error) {
			console.error('Error fetching top searched products:', error);
			setTopSearchProducts([]);
		}
	};

	const handleTopSearchPrev = () => {
		if (topSearchIndex > 0) {
			setTopSearchIndex(topSearchIndex - 1);
		}
	};

	const handleTopSearchNext = () => {
		if (topSearchIndex + topSearchItems < topSearchProducts.length) {
			setTopSearchIndex(topSearchIndex + 1);
		}
	};

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
		<Container fluid style={{ padding: '0', backgroundColor: '#f8f9fa' }}>
			<Advertisement images={bannerImages} />

			<Container style={{ paddingTop: '20px', paddingBottom: '40px' }}>
				<Categories
					categories={categories}
					selectedCategory={selectedCategory}
					onCategorySelect={handleCategorySelect}
				/>

				<TopSearch
					topSearchProducts={topSearchProducts.slice(
						topSearchIndex,
						topSearchIndex + topSearchItems,
					)}
					onPrev={handleTopSearchPrev}
					onNext={handleTopSearchNext}
					onZoom={handleOpenDetail}
					onAddCart={handleAddCart}
					user_id={user?.id}
				/>

				<ProductList
					products={products}
					onAddCart={handleAddCart}
					onZoom={handleOpenDetail}
					user_id={user?.id}
					isLoading={isLoading}
				/>

				<CustomPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</Container>

			<ProductPreview
				showDetail={showDetail}
				handleCloseDetail={handleCloseDetail}
				selectedProduct={selectedProduct}
				onAddToCart={handleAddCart}
				user_id={user?.id}
			/>

			<NotificationToast
				show={showToast}
				message={toastMessage}
				variant={toastVariant}
				onClose={() => setShowToast(false)}
			/>
		</Container>
	);
}

export default ListPage;