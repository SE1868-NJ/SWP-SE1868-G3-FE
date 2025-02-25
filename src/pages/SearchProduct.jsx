import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomPagination from '../components/Products/CustomPagination';
import ProductList from '../components/Products/ProductList';
import { useAuth } from '../hooks/contexts/AuthContext';
import { productService } from '../services/productService';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ListPage() {
	const query = useQuery();
	const navigate = useNavigate();
	const searchKeyword = query.get('search')?.toLowerCase() || ''; // Lấy từ khóa tìm kiếm
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const { handleAddCart, user } = useAuth();

	useEffect(() => {
		fetchProducts();
	}, [currentPage, searchKeyword]); // Gọi lại khi trang hoặc từ khóa tìm kiếm thay đổi

	const fetchProducts = async () => {
		try {
			const searchTerm = query.get('query')?.toLowerCase() || ''; // Lấy từ khóa tìm kiếm từ URL

			const params = {
				page: currentPage,
				limit: 8,
			};

			const response = await productService.getProducts(params);
			console.log('Dữ liệu API:', response.items); // Kiểm tra dữ liệu trả về

			if (!response.items) {
				setProducts([]);
				return;
			}

			const filteredProducts = response.items.filter(
				(product) =>
					product.product_name &&
					product.product_name.toLowerCase().includes(searchTerm),
			);

			setProducts(filteredProducts);
			setTotalPages(response.metadata.totalPages);
		} catch (error) {
			console.error('Lỗi khi tải sản phẩm:', error);
		}
	};

	return (
		<>
			<ProductList
				products={products}
				onAddCart={handleAddCart}
				user_id={user?.id}
			/>
			<CustomPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</>
	);
}

export default ListPage;
