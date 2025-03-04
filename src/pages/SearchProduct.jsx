import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomPagination from '../components/Products/CustomPagination';
import ProductSearch from '../components/Products/ProductSearch';
import { useAuth } from '../hooks/contexts/AuthContext';
import { productService } from '../services/productService';
import ProductSideBar from './ProductSideBar';

import 'bootstrap/dist/css/bootstrap.min.css';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SearchProduct() {
	const query = useQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [sortPrice, setSortPrice] = useState('asc');
	const { handleAddCart, user } = useAuth();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const searchTerm = query.get('query')?.toLowerCase() || '';

				const params = {
					page: currentPage,
					limit: 8,
					search: searchTerm,
					sortPrice: sortPrice,
				};

				const response = await productService.getProducts(params);
				setProducts(response.items || []);
				setTotalPages(response.metadata.totalPages);
			} catch (error) {
				console.error('Lỗi khi tải sản phẩm:', error);
			}
		};
		fetchProducts();
	}, [currentPage, query, sortPrice]);

	const handleSortPrice = (order) => {
		setSortPrice(order);
	};

	const searchTerm = query.get('query') || '';

	return (
		<div className='container-fluid mt-4'>
			<div className='row'>
				{/* Sidebar - Bộ lọc */}
				<div className='col-md-2'>
					<ProductSideBar />
				</div>

				{/* Kết quả tìm kiếm */}
				<div className='col-md-10'>
					<ProductSearch
						products={products}
						onAddCart={handleAddCart}
						user_id={user?.id}
						onSortPrice={handleSortPrice}
						searchTerm={searchTerm}
					/>
					<CustomPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default SearchProduct;
