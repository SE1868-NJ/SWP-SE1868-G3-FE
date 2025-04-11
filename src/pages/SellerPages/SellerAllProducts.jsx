import { useState, useEffect } from 'react';
import { shopService } from '../../services/shopService';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';

function SellerAllProducts() {
	const { shop_id } = useAuth();
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [totalProducts, setTotalProducts] = useState(0);
	const [categories, setCategories] = useState([]);
	const [supplierList, setSupplierList] = useState([]);

	const [showSuccessToast, setShowSuccessToast] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	// Modal states
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('add');
	const [currentProduct, setCurrentProduct] = useState(null);
	const [formData, setFormData] = useState({
		product_name: '',
		product_description: '',
		stock_quantity: 0,
		import_price: 0,
		sale_price: 0,
		category_id: '',
		supplier_id: '',
		shop_id: shop_id,
		product_image: null,
		SKU: '',
	});

	// Delete confirmation modal
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	useEffect(() => {
		fetchProducts();
		fetchCategories();
		fetchSuppliers();
	}, [shop_id, search]);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const params = {
				page: 1,
				limit: 10,
				search,
				sort: 'product_name',
				order: 'asc',
			};
			const data = await shopService.getSellerProducts(shop_id, params);
			console.log('Fetched products:', data.products);
			setProducts(data.products || []);
			setTotalProducts(data.total || 0);
		} catch (error) {
			console.error('Lỗi khi lấy danh sách sản phẩm:', error);
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const data = await shopService.getCategory();
			setCategories(data || []);
		} catch (error) {
			console.error('Lỗi khi lấy danh mục:', error);
			setCategories([]);
		}
	};
	const fetchSuppliers = async () => {
		try {
			const res = await shopService.getAllSuppliers();

			const suppliersArray = res.items || [];

			setSupplierList(suppliersArray);
		} catch (err) {
			console.error('Lỗi khi load danh sách supplier:', err);
			setSupplierList([]);
		}
	};

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const handleResetSearch = () => {
		setSearch('');
	};

	// Form handling
	const handleInputChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === 'file') {
			setFormData({ ...formData, [name]: files[0] });
		} else if (type === 'number') {
			setFormData({ ...formData, [name]: parseFloat(value) });
		} else if (['category_id', 'supplier_id', 'shop_id'].includes(name)) {
			setFormData({ ...formData, [name]: parseInt(value) || null });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	// Open modal for adding new product
	const handleAddProduct = () => {
		setModalType('add');
		setFormData({
			product_name: '',
			product_description: '',
			stock_quantity: 0,
			import_price: 0,
			sale_price: 0,
			category_id: '',
			supplier_id: '',
			shop_id: shop_id,
			product_image: null,
			SKU: '',
		});
		setShowModal(true);
	};

	// Open modal for editing product
	const handleEditProduct = (product) => {
		setModalType('edit');
		setCurrentProduct(product);
		setFormData({
			product_name: product.product_name || '',
			product_description: product.product_description || '',
			stock_quantity: product.stock_quantity || 0,
			import_price: product.import_price || 0,
			sale_price: product.sale_price || 0,
			category_id: product.category_id || '',
			supplier_id: product.supplier_id || '',
			shop_id: shop_id,
			product_image: null, // Không thể đặt file input, để null
		});
		setShowModal(true);
	};

	const handleDeleteConfirmation = (product) => {
		setProductToDelete(product);
		setShowDeleteModal(true);
	};

	// Submit form for create/update
	const handleSubmit = async (e) => {
		e.preventDefault();

		const submitFormData = new FormData();
		const categoryId = formData.category_id
			? parseInt(formData.category_id)
			: null;
		const supplierId = formData.supplier_id
			? parseInt(formData.supplier_id)
			: null;

		Object.keys(formData).forEach((key) => {
			if (key === 'category_id') {
				submitFormData.append(key, categoryId);
			} else if (key === 'supplier_id') {
				submitFormData.append(key, supplierId);
			} else if (key === 'shop_id') {
				submitFormData.append(key, shop_id);
			} else if (key === 'product_image') {
				if (formData.product_image instanceof File) {
					submitFormData.append('product_image', formData.product_image);
				}
			} else if (formData[key] !== null) {
				submitFormData.append(key, formData[key]);
			}
		});
		for (let [key, value] of submitFormData.entries()) {
			console.log(`${key}:`, value);
		}

		try {
			if (modalType === 'add') {
				await shopService.createProduct(submitFormData);
				setSuccessMessage('Thêm sản phẩm thành công!');
			} else {
				await shopService.updateProduct(currentProduct.id, submitFormData);
				setSuccessMessage('Lưu sản phẩm thành công!');
			}

			setTimeout(() => {
				setShowModal(false);
			}, 2000);
			setShowSuccessToast(true);
			setTimeout(() => {
				setShowSuccessToast(false);
			}, 5000);

			fetchProducts();
		} catch (error) {
			console.error('Lỗi khi lưu sản phẩm:', error);
		}
	};

	// Delete product
	const handleDeleteProduct = async () => {
		if (!productToDelete) return;
		try {
			await shopService.deleteProduct(productToDelete.id);
			setShowDeleteModal(false);
			fetchProducts();
		} catch (error) {
			console.error('Lỗi khi xóa sản phẩm:', error);
		}
	};

	return (
		<div className='container-fluid p-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<div className='d-flex justify-content-between align-items-center mb-4'>
					<h2 className='m-0 fw-bold'>Sản phẩm</h2>
				</div>
				<div className='d-flex justify-content-between align-items-center mb-4'>
					<button className='btn btn-danger' onClick={handleAddProduct}>
						+ Thêm sản phẩm mới
					</button>
				</div>
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
							<th>Hành động</th>
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
												product.image_url
													? product.image_url.startsWith('http')
														? product.image_url
														: `http://localhost:4000${product.image_url}`
													: product.images?.[0]?.image_url
														? product.images[0].image_url.startsWith('http')
															? product.images[0].image_url
															: `http://localhost:4000${product.images[0].image_url}`
														: '/default-image.jpg'
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
									<td>
										<span
											className='text-primary'
											style={{ cursor: 'pointer' }}
											onClick={() => handleEditProduct(product)}
										>
											Sửa
										</span>
										<br />
										<span
											className='text-primary'
											style={{ cursor: 'pointer' }}
											onClick={() => handleDeleteConfirmation(product)}
										>
											Xóa
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='8' className='text-center'>
									Không có sản phẩm nào
								</td>
							</tr>
						)}
					</tbody>
				</table>
			)}

			{/* Add/Edit Product Modal */}
			<Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>
						{modalType === 'add' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>
								Tên sản phẩm <span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								name='product_name'
								value={formData.product_name}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Select
							name='category_id'
							value={formData.category_id}
							onChange={handleInputChange}
						>
							<option value=''>Chọn danh mục</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</Form.Select>

						<Form.Label>Supplier</Form.Label>
						<Form.Select
							name='supplier_id'
							value={formData.supplier_id}
							onChange={handleInputChange}
							required
						>
							<option value=''>Chọn nhà cung cấp</option>
							{Array.isArray(supplierList) && supplierList.length > 0 ? (
								supplierList.map((supplier) => (
									<option
										key={supplier.supplier_id}
										value={supplier.supplier_id}
									>
										{supplier.supplier_name}
									</option>
								))
							) : (
								<option disabled>Không có nhà cung cấp</option>
							)}
						</Form.Select>

						<Form.Group controlId='sku'>
							<Form.Label>SKU</Form.Label>
							<Form.Control
								type='text'
								value={formData.SKU}
								onChange={(e) =>
									setFormData({ ...formData, SKU: e.target.value })
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Mô tả sản phẩm</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								name='product_description'
								value={formData.product_description}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<div className='row'>
							<div className='col-md-4'>
								<Form.Group className='mb-3'>
									<Form.Label>
										Giá nhập <span className='text-danger'>*</span>
									</Form.Label>
									<Form.Control
										type='number'
										name='import_price'
										value={formData.import_price}
										onChange={handleInputChange}
										required
										min='0'
									/>
								</Form.Group>
							</div>

							<div className='col-md-4'>
								<Form.Group className='mb-3'>
									<Form.Label>
										Giá bán <span className='text-danger'>*</span>
									</Form.Label>
									<Form.Control
										type='number'
										name='sale_price'
										value={formData.sale_price}
										onChange={handleInputChange}
										required
										min='0'
									/>
								</Form.Group>
							</div>

							<div className='col-md-4'>
								<Form.Group className='mb-3'>
									<Form.Label>
										Số lượng <span className='text-danger'>*</span>
									</Form.Label>
									<Form.Control
										type='number'
										name='stock_quantity'
										value={formData.stock_quantity}
										onChange={handleInputChange}
										required
										min='0'
									/>
								</Form.Group>
							</div>
						</div>

						<Form.Group className='mb-3'>
							<Form.Label>
								Hình ảnh sản phẩm{' '}
								{modalType === 'add' && <span className='text-danger'>*</span>}
							</Form.Label>
							<Form.Control
								type='file'
								name='product_image'
								onChange={handleInputChange}
								required={modalType === 'add'}
								accept='image/jpeg,image/png,image/jpg'
							/>
							<Form.Text className='text-muted'>
								Chỉ chấp nhận định dạng JPG, JPEG, PNG. Kích thước tối đa 2MB.
							</Form.Text>
						</Form.Group>

						{modalType === 'edit' && formData.image_url && (
							<div className='mb-3'>
								<p>Hình ảnh hiện tại:</p>
								<img
									src={formData.image_url}
									alt='Hình ảnh sản phẩm'
									style={{
										width: '100px',
										height: '100px',
										objectFit: 'cover',
									}}
								/>
							</div>
						)}
						{/* Success Toast Notification */}
						<div
							className={`position-fixed bottom-0 end-0 p-3 ${showSuccessToast ? 'd-block' : 'd-none'}`}
							style={{ zIndex: 11 }}
						>
							<div
								className='toast show'
								role='alert'
								aria-live='assertive'
								aria-atomic='true'
							>
								<div className='toast-header'>
									<strong className='me-auto'>Thông báo</strong>
									<button
										type='button'
										className='btn-close'
										onClick={() => setShowSuccessToast(false)}
									></button>
								</div>
								<div className='toast-body bg-success text-white'>
									{successMessage}
								</div>
							</div>
						</div>
						<div className='d-flex justify-content-end'>
							<Button
								variant='secondary'
								className='me-2'
								onClick={() => setShowModal(false)}
							>
								Hủy
							</Button>
							<Button variant='danger' type='submit'>
								{modalType === 'add' ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{productToDelete && (
						<p>
							Bạn có chắc chắn muốn xóa sản phẩm {productToDelete.product_name}?
						</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
						Hủy
					</Button>
					<Button variant='danger' onClick={handleDeleteProduct}>
						Xóa
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SellerAllProducts;
