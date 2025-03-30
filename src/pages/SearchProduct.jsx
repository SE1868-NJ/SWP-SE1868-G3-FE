import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CustomPagination from '../components/Pagination/CustomPagination';
import ProductSearch from '../components/Products/ProductSearch';
import { useAuth } from '../hooks/contexts/AuthContext';
import { productService } from '../services/productService';
import ProductSideBar from './ProductSideBar';
import NoProductsFound from '../components/Products/NoProductsFound';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SearchProduct() {
	const query = useQuery();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);
	const [sortPrice, setSortPrice] = useState('asc');
	const [isLoading, setIsLoading] = useState(true);
	const { handleAddCart, user } = useAuth();
	const [categories, setCategories] = useState([]);

	const searchTerm = query.get('query')?.toLowerCase() || '';
	const selectedCategory = query.get('category') || '';

	const defaultFilters = {
		categories: [],
		priceRange: { min: 0, max: 10000000 }
	};

	const [filters, setFilters] = useState({
		categories: selectedCategory ? [selectedCategory] : [],
		priceRange: { min: 0, max: 10000000 }
	});

	// Fetch categories on component mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await productService.getCategories();
				console.log("Categories from API:", response);

				if (response && Array.isArray(response)) {
					// Extract category names based on API response structure
					const categoryNames = response.map(cat =>
						cat.category_name || cat.name || ''
					).filter(name => name !== '');

					setCategories(categoryNames);
				} else {
					// Default categories if API call fails
					setCategories(['Đồ ăn', 'Đồ uống', 'Đồ ăn chay', 'Đồ ăn sống']);
				}
			} catch (error) {
				console.error('Error fetching categories:', error);
				setCategories(['Đồ ăn', 'Đồ uống', 'Đồ ăn chay', 'Đồ ăn sống']);
			}
		};

		fetchCategories();
	}, []);

	// Update filters when selectedCategory changes from URL
	useEffect(() => {
		if (selectedCategory) {
			setFilters(prev => ({
				...prev,
				categories: [selectedCategory]
			}));
		}
	}, [selectedCategory]);

	// Fetch products based on filters
	// Hàm fetchProducts trong SearchProduct.jsx
	const fetchProducts = useCallback(async () => {
		try {
			setIsLoading(true);

			// Không truyền filter Category, lấy tất cả sản phẩm trước rồi lọc sau
			const params = {
				page: 1,
				limit: 100, // Lấy nhiều sản phẩm hơn để lọc phía client
				search: searchTerm,
				sortPrice: sortPrice,
				// Không truyền categories để lấy tất cả
				minPrice: filters.priceRange.min,
				maxPrice: filters.priceRange.max
			};

			// Make the API call
			const response = await productService.getProducts(params);

			console.log("API response:", response);

			if (response && response.items) {
				let filteredItems = response.items;

				// Lọc theo danh mục phía client
				if (filters.categories.length > 0) {
					filteredItems = filteredItems.filter(product => {
						// Lấy thông tin danh mục của sản phẩm
						const productCategory = product.category &&
							(product.category.category_name || product.category.name) || '';

						// Kiểm tra xem sản phẩm có thuộc danh mục nào trong filters.categories không
						return filters.categories.some(categoryName =>
							productCategory.includes(categoryName)
						);
					});
				}

				// Đảm bảo lọc theo khoảng giá
				filteredItems = filteredItems.filter(product => {
					const price = product.sale_price || 0;
					return price >= filters.priceRange.min && price <= filters.priceRange.max;
				});

				// Sắp xếp theo giá
				if (sortPrice === 'asc') {
					filteredItems.sort((a, b) => (a.sale_price || 0) - (b.sale_price || 0));
				} else {
					filteredItems.sort((a, b) => (b.sale_price || 0) - (a.sale_price || 0));
				}

				// Tính toán phân trang
				const startIndex = (currentPage - 1) * 12;
				const endIndex = startIndex + 12;
				const paginatedItems = filteredItems.slice(startIndex, endIndex);

				setProducts(paginatedItems);
				setTotalPages(Math.ceil(filteredItems.length / 12));
				setTotalProducts(filteredItems.length);
			} else {
				// Handle empty response
				setProducts([]);
				setTotalPages(0);
				setTotalProducts(0);
			}
		} catch (error) {
			console.error('Error fetching products:', error);
			setProducts([]);
			setTotalPages(0);
			setTotalProducts(0);
		} finally {
			setIsLoading(false);
		}
	}, [currentPage, searchTerm, sortPrice, filters]);
	// Helper function to fetch with standard API
	const fetchWithStandardAPI = async () => {
		// Format categories parameter for API request
		const categoriesParam = filters.categories.join(',');

		console.log("Using standard API with filters:", {
			categories: categoriesParam,
			priceRange: filters.priceRange
		});

		const params = {
			page: currentPage,
			limit: 12,
			search: searchTerm,
			sortPrice: sortPrice,
			categories: categoriesParam,
			minPrice: filters.priceRange.min,
			maxPrice: filters.priceRange.max
		};

		// Make the API call
		const response = await productService.getProducts(params);

		if (response && response.items) {
			setProducts(response.items || []);
			setTotalPages(response.metadata?.totalPages || 0);
			setTotalProducts(response.metadata?.total || 0);
		} else {
			// Handle empty response
			setProducts([]);
			setTotalPages(0);
			setTotalProducts(0);
		}
	};

	// Fetch products when dependencies change
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const handleSortPrice = useCallback((order) => {
		setSortPrice(order);
	}, []);

	const handleFilterChange = useCallback((newFilters) => {
		console.log("Filter changed:", newFilters);
		setFilters(newFilters);
		setCurrentPage(1); // Reset to first page when filters change
	}, []);

	const handleResetFilters = useCallback(() => {
		// Reset all filters to default
		setFilters({
			categories: [],
			priceRange: { min: 0, max: 10000000 }
		});

		// Reset sort
		setSortPrice('asc');

		// Reset page
		setCurrentPage(1);

		// If there was a category in the URL, navigate to remove it
		if (selectedCategory) {
			const newUrl = searchTerm ? `/search?query=${searchTerm}` : '/search';
			navigate(newUrl);
		}
	}, [navigate, searchTerm, selectedCategory]);

	const handlePageChange = useCallback((page) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container fluid style={{ padding: '20px 0', backgroundColor: '#f8f9fa' }}>
			<Container>
				<Row>
					{/* Sidebar - Filter */}
					<Col md={3}>
						<div style={{
							backgroundColor: 'white',
							borderRadius: '8px',
							boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
							marginBottom: '20px'
						}}>
							<ProductSideBar
								filters={filters}
								onFilterChange={handleFilterChange}
								allCategories={categories}
							/>
						</div>
					</Col>

					{/* Search results */}
					<Col md={9}>
						<div style={{
							backgroundColor: 'white',
							borderRadius: '8px',
							boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
							padding: '20px',
							marginBottom: '20px'
						}}>
							<ProductSearch
								products={products}
								onAddCart={handleAddCart}
								user_id={user?.id}
								onSortPrice={handleSortPrice}
								searchTerm={searchTerm}
								isLoading={isLoading}
								totalProducts={totalProducts}
								onResetFilters={handleResetFilters}
							/>
						</div>

						{totalPages > 0 && (
							<CustomPagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default SearchProduct;