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
	const tabs = [{ id: 'all', label: 'Tất cả', count: null }];

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
					limit: 20,
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
				<h5 className='m-0'>Sản phẩm</h5>
				<div className='d-flex gap-2'>
					<button className='btn btn-danger'>
						<Plus size={18} className='me-1' />
						Thêm 1 sản phẩm mới
					</button>
				</div>
			</div>

			<ul className='nav nav-tabs mb-4'>
				{tabs.map((tab) => (
					<li className='nav-item' key={tab.id}>
						<button
							className={`nav-link ${activeTab === tab.id ? 'active text-danger' : ''}`}
							onClick={() => setActiveTab(tab.id)}
						>
							{tab.label} {tab.count !== null && `(${tab.count})`}
						</button>
					</li>
				))}
			</ul>

			<div className='row mb-4'>
				<div className='col-12'>
					<div className='input-group'>
						<span className='input-group-text'>Tìm kiếm Sản phẩm</span>
						<input
							type='text'
							className='form-control'
							placeholder='Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm'
							value={search}
							onChange={handleSearchChange}
						/>
					</div>
				</div>
			</div>

			<div className='d-flex gap-2 mb-4'>
				<button className='btn btn-danger'>Áp dụng</button>
				<button
					className='btn btn-outline-secondary'
					onClick={handleResetSearch}
				>
					Nhập Lại
				</button>
			</div>

			<div className='d-flex justify-content-between align-items-center mb-4'>
				<div className='d-flex align-items-center'>
					<span className='me-3'>{totalProducts} Sản Phẩm</span>
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
							<th>
								<input type='checkbox' className='form-check-input' />
							</th>
							<th>Tên sản phẩm</th>
							<th>Doanh số</th>
							<th>Giá</th>
							<th>Kho hàng</th>
						</tr>
					</thead>
					<tbody>
						{products.length > 0 ? (
							products.map((product) => (
								<tr key={product.id}>
									<td>
										<input type='checkbox' className='form-check-input' />
									</td>
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

									<td>{Number(product.revenue).toFixed(2)}</td>
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
