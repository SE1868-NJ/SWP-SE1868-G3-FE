import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomPagination from '../components/Products/CustomPagination';
import ProductSearch from '../components/Products/ProductSearch';
import { useAuth } from '../hooks/contexts/AuthContext';
import { productService } from '../services/productService';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SearchProduct() {
	const query = useQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [sortPrice, setSortPrice] = useState('asc'); // Mặc định tăng dần
	const { handleAddCart, user } = useAuth();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const searchTerm = query.get('query')?.toLowerCase() || '';

				const params = {
					page: currentPage,
					limit: 8,
					search: searchTerm,
					sortPrice: sortPrice, // Thêm tham số sortPrice
				};
				console.log('Tham số API:', params); // In thông tin tham số truyền đi cho API

				const response = await productService.getProducts(params);
				console.log('Dữ liệu API:', response.items);

				if (!response.items) {
					setProducts([]);
					return;
				}

				setProducts(response.items);
				setTotalPages(response.metadata.totalPages);
			} catch (error) {
				console.error('Lỗi khi tải sản phẩm:', error);
			}
		};
		fetchProducts();
	}, [currentPage, query, sortPrice]); // Theo dõi cả sortPrice

	// Hàm xử lý khi người dùng chọn sắp xếp
	const handleSortPrice = (order) => {
		setSortPrice(order);
	};

	return (
		<>
			<ProductSearch
				products={products}
				onAddCart={handleAddCart}
				user_id={user?.id}
				onSortPrice={handleSortPrice} // Truyền xuống cho ProductSearch
			/>
			<CustomPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</>
	);
}

export default SearchProduct;
