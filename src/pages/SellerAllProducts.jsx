import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Plus } from 'lucide-react';
import { shopService } from '../services/shopService';
import { useParams } from 'react-router-dom';

function SellerAllProducts() {
	const { shopId } = useParams();
	const [activeTab, setActiveTab] = useState('all');
	const [viewMode, setViewMode] = useState('list');
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [totalProducts, setTotalProducts] = useState(0);

	useEffect(() => {
		const fetchProducts = async () => {
			if (!shopId) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const params = {
					page: 1,
					limit: 10,
					search,
					sort: 'product_name',
					order: 'asc',
				};

				const data = await shopService.getSellerProducts(shopId, params);

				setProducts(data.products || []);
				setTotalProducts(data.total || 0);
			} catch (error) {
				console.error('Lỗi khi lấy danh sách sản phẩm:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [shopId, search]);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	// Handle search reset
	const handleResetSearch = () => {
		setSearch('');
	};

	return (
		<div className='container-fluid p-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h2 className='m-0 fw-bold'>Sản phẩm</h2>
			</div>

			<div className='row mb-4'>
				<div className='col-12 d-flex justify-content-start gap-2'>
					<div className='input-group' style={{ width: '300px' }}>
						<input
							type='text'
							className='form-control'
							placeholder='Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại'
							value={search}
							onChange={handleSearchChange}
						/>
					</div>
					<button className='btn btn-danger'>Áp dụng</button>
					<button
						className='btn btn-outline-secondary'
						onClick={handleResetSearch}
					>
						Nhập Lại
					</button>
				</div>
			</div>

			<div className='d-flex justify-content-between align-items-center mb-4'>
				<div className='d-flex align-items-center'>
					<span className='me-3 px-2 py-1 bg-danger text-white rounded'>
						{totalProducts} Sản Phẩm
					</span>
				</div>
			</div>

			{loading ? (
				<div className='text-center'>
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Đang tải...</span>
					</div>
				</div>
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Tên sản phẩm</th>
							<th>Phân loại</th>
							<th>Mô tả</th>
							<th>Giá nhập</th>
							<th>Giá bán</th>
							<th>Kho hàng</th>
						</tr>
					</thead>
					<tbody>
						{products.length > 0 ? (
							products.map((product, index) => (
								<tr key={product.id}>
									<td>{index + 1}</td>
									<td>
										<img
											src={
												product.image_url ||
												product.images?.[0]?.image_url ||
												'/default-image.jpg'
											}
											alt={product.product_name}
											style={{
												width: '50px',
												height: '50px',
												objectFit: 'cover',
												borderRadius: '5px',
												marginRight: '10px',
											}}
										/>
										{product.product_name}
									</td>
									<td>{product.category?.name}</td>
									<td>{product.product_description}</td>
									<td>{product.import_price} đ</td>
									<td>{product.sale_price} đ</td>
									<td>{product.stock_quantity}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='5' className='text-center'>
									Không có sản phẩm nào
								</td>
							</tr>
						)}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default SellerAllProducts;
