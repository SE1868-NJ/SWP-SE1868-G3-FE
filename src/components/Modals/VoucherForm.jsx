import React, { useState } from 'react';

const VoucherForm = ({ onClose, onSubmit }) => {
	const [activeTab, setActiveTab] = useState('info');
	const [formData, setFormData] = useState({
		name: '',
		startDate: '',
		endDate: '',
		value: '',
		valueType: 'money',
		maxDiscount: '',
		quantity: '1000',
		codeType: 'single',
		code: '',
		showInCashier: true,
		description: '',
		serviceLimit: 'total',
		usageLimit: '1',
		unlimitedUsage: false,
		customerRank: true,
		customerRankValue: '',
		customerGroup: true,
		customerGroupValue: '',
		appointmentType: true,
		appointmentTypeValue: '',
		branch: true,
		branchValue: '',
		customerType: 'all',
		timeLimit: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleRadioChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleQuickDateSelect = (days) => {
		const today = new Date();
		const endDate = new Date();
		endDate.setDate(today.getDate() + days);

		setFormData({
			...formData,
			startDate: formatDate(today),
			endDate: formatDate(endDate),
		});
	};

	const formatDate = (date) => {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let updatedData = { ...formData };
		if (!formData.code) {
			updatedData.code = generateRandomCode();
		}
		onSubmit(updatedData);
	};

	const generateRandomCode = () => {
		return Math.random().toString(36).substring(2, 10).toUpperCase();
	};

	const styles = {
		modal: {
			display: 'block',
		},
		modalContent: {
			borderRadius: '12px',
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
			border: 'none',
			maxWidth: '1100px', // Increased from 900px to 1100px
			margin: '0 auto',
			width: '98%', // Increased from 95% to 98%
		},
		modalHeader: {
			borderBottom: '1px solid #eaeaea',
			padding: '16px 24px',
		},
		modalTitle: {
			fontSize: '20px',
			fontWeight: '600',
			color: '#333',
		},
		modalBody: {
			padding: '24px',
		},
		modalFooter: {
			borderTop: '1px solid #eaeaea',
			padding: '16px 24px',
		},
		navTabs: {
			borderBottom: '1px solid #eaeaea',
			display: 'flex',
			marginBottom: '20px',
		},
		navLink: {
			color: '#666',
			border: 'none',
			padding: '12px 20px',
			fontWeight: '500',
			cursor: 'pointer',
			background: 'none',
			textDecoration: 'none',
			fontSize: '16px',
		},
		navLinkActive: {
			color: '#f56e6e',
			borderBottom: '3px solid #f56e6e',
			backgroundColor: 'transparent',
		},
		formGroup: {
			marginBottom: '20px',
		},
		label: {
			fontWeight: '500',
			color: '#444',
			marginBottom: '8px',
			display: 'block',
			fontSize: '16px',
		},
		formControl: {
			borderRadius: '6px',
			border: '1px solid #ddd',
			padding: '10px 14px',
			fontSize: '16px',
			width: '100%',
		},
		formCheck: {
			marginRight: '20px',
			fontSize: '16px',
			display: 'flex',
			alignItems: 'center',
		},
		btn: {
			borderRadius: '6px',
			padding: '10px 18px',
			fontWeight: '500',
			fontSize: '16px',
			cursor: 'pointer',
			border: 'none',
		},
		btnPrimary: {
			backgroundColor: '#f56e6e',
			borderColor: '#f56e6e',
			color: 'white',
		},
		btnSecondary: {
			backgroundColor: '#f2f2f2',
			borderColor: '#ddd',
			color: '#666',
		},
		quickDateBtn: {
			fontSize: '15px',
			padding: '10px 14px',
		},
		flex: {
			display: 'flex',
			alignItems: 'center',
		},
		flexGap: {
			display: 'flex',
			alignItems: 'center',
			gap: '12px',
		},
		textDanger: {
			color: '#f56e6e',
			fontSize: '14px',
			marginTop: '6px',
		},
		asterisk: {
			color: '#f56e6e',
			fontSize: '18px',
		},
		row: {
			display: 'flex',
			marginLeft: '-12px',
			marginRight: '-12px',
			flexWrap: 'wrap',
		},
		col: {
			padding: '0 12px',
			flexBasis: '0',
			flexGrow: '1',
		},
		col50: {
			padding: '0 12px',
			flexBasis: '0',
			flexGrow: '1',
			maxWidth: '50%',
		},
		dropdown: {
			position: 'relative',
			display: 'inline-block',
		},
		dropdownMenu: {
			position: 'absolute',
			backgroundColor: '#fff',
			minWidth: '160px',
			boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
			zIndex: '1',
			borderRadius: '6px',
			padding: '8px 0',
		},
		dropdownItem: {
			color: '#333',
			padding: '10px 16px',
			textDecoration: 'none',
			display: 'block',
			fontSize: '15px',
			cursor: 'pointer',
		},
		checkboxInput: {
			width: '18px',
			height: '18px',
			marginRight: '10px',
		},
		radioInput: {
			width: '18px',
			height: '18px',
			marginRight: '10px',
		},
		textarea: {
			borderRadius: '6px',
			border: '1px solid #ddd',
			padding: '12px 16px',
			fontSize: '16px',
			width: '100%',
			minHeight: '100px',
		},
	};

	return (
		<div className="modal show d-block" tabIndex="-1" role="dialog" style={styles.modal}>
			<div className="modal-dialog" role="document">
				<div className="modal-content" style={styles.modalContent}>
					<div className="modal-header" style={styles.modalHeader}>
						<h5 className="modal-title" style={styles.modalTitle}>Thêm mới voucher</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}
							style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body" style={styles.modalBody}>
						{/* Tabs */}
						<div style={styles.navTabs}>
							<a href="#info" onClick={(e) => { e.preventDefault(); setActiveTab('info'); }}
								style={activeTab === 'info' ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>
								Thông tin
							</a>
							<a href="#apply" onClick={(e) => { e.preventDefault(); setActiveTab('apply'); }}
								style={activeTab === 'apply' ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>
								Áp dụng
							</a>
						</div>

						<form onSubmit={handleSubmit}>
							{/* Info Tab */}
							{activeTab === 'info' && (
								<div>
									<div style={styles.formGroup}>
										<label htmlFor="name" style={styles.label}>
											<span style={styles.asterisk}>* </span>Tên voucher:
										</label>
										<input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={styles.formControl} />
									</div>

									<div style={styles.formGroup}>
										<label htmlFor="startDate" style={styles.label}>
											<span style={styles.asterisk}>* </span>Thời gian sử dụng:
										</label>
										<div style={styles.flexGap}>
											<input type="text" id="startDate" name="startDate" placeholder="DD/MM/YYYY"
												value={formData.startDate} onChange={handleChange} required style={styles.formControl} />
											<span style={{ fontSize: '18px' }}>-</span>
											<input type="text" id="endDate" name="endDate" placeholder="DD/MM/YYYY"
												value={formData.endDate} onChange={handleChange} required style={styles.formControl} />
											<div style={styles.dropdown}>
												<button type="button" style={{ ...styles.btn, ...styles.btnSecondary, ...styles.quickDateBtn }}>
													Chọn nhanh ▼
												</button>
												<div style={styles.dropdownMenu}>
													<div onClick={() => handleQuickDateSelect(7)} style={styles.dropdownItem}>1 tuần tới</div>
													<div onClick={() => handleQuickDateSelect(30)} style={styles.dropdownItem}>1 tháng tới</div>
													<div onClick={() => handleQuickDateSelect(90)} style={styles.dropdownItem}>3 tháng tới</div>
												</div>
											</div>
										</div>
									</div>

									<div style={styles.row}>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label htmlFor="value" style={styles.label}>
													<span style={styles.asterisk}>* </span>Giá trị voucher:
												</label>
												<div style={styles.flexGap}>
													<input type="number" id="value" name="value" value={formData.value} onChange={handleChange} required style={styles.formControl} />
													<span style={{ fontSize: '18px' }}>đ</span>
												</div>
												<div style={{ display: 'flex', marginTop: '12px' }}>
													<div style={styles.formCheck}>
														<input type="radio" id="valueTypeMoney" name="valueTypeRadio" checked={formData.valueType === 'money'}
															onChange={() => handleRadioChange('valueType', 'money')} style={styles.radioInput} />
														<label htmlFor="valueTypeMoney">Tiền(đ)</label>
													</div>
													<div style={styles.formCheck}>
														<input type="radio" id="valueTypePercent" name="valueTypeRadio" checked={formData.valueType === 'percent'}
															onChange={() => handleRadioChange('valueType', 'percent')} style={styles.radioInput} />
														<label htmlFor="valueTypePercent">Phần trăm(%)</label>
													</div>
												</div>
												{formData.valueType === 'percent' && (
													<div style={{ ...styles.flexGap, marginTop: '12px' }}>
														<label htmlFor="maxDiscount" style={{ ...styles.label, marginTop: '4px', marginBottom: '0' }}>Giảm tối đa:</label>
														<input type="number" id="maxDiscount" name="maxDiscount" value={formData.maxDiscount}
															onChange={handleChange} style={styles.formControl} />
														<span style={{ fontSize: '18px' }}>đ</span>
													</div>
												)}
											</div>
										</div>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label htmlFor="quantity" style={styles.label}>Số lượng phát hành:</label>
												<input type="number" id="quantity" name="quantity" value={formData.quantity}
													onChange={handleChange} style={styles.formControl} />
											</div>
											<div style={styles.formGroup}>
												<label style={styles.label}>Loại mã voucher:</label>
												<div>
													<div style={{ ...styles.formCheck, marginBottom: '10px' }}>
														<input type="radio" id="codeTypeSingle" name="codeTypeRadio" checked={formData.codeType === 'single'}
															onChange={() => handleRadioChange('codeType', 'single')} style={styles.radioInput} />
														<label htmlFor="codeTypeSingle">1 mã dùng nhiều lần</label>
													</div>
													<div style={styles.formCheck}>
														<input type="radio" id="codeTypeMulti" name="codeTypeRadio" checked={formData.codeType === 'multi'}
															onChange={() => handleRadioChange('codeType', 'multi')} style={styles.radioInput} />
														<label htmlFor="codeTypeMulti">Nhiều mã (mỗi mã 1 lần)</label>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div style={styles.formGroup}>
										<label htmlFor="code" style={styles.label}>Mã voucher:</label>
										<input type="text" id="code" name="code" placeholder="Mã voucher sẽ tự động sinh nếu không nhập"
											value={formData.code} onChange={handleChange} style={styles.formControl} />
										<small style={styles.textDanger}>*Vui lòng chỉ nhập chữ cái không dấu và chữ số</small>
									</div>

									<div style={styles.row}>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label style={styles.label}>Hiển thị trên tìm kiếm thu ngân:</label>
												<div style={{ display: 'flex' }}>
													<div style={styles.formCheck}>
														<input type="radio" id="showInCashierYes" name="showInCashierRadio" checked={formData.showInCashier === true}
															onChange={() => handleRadioChange('showInCashier', true)} style={styles.radioInput} />
														<label htmlFor="showInCashierYes">Có</label>
													</div>
													<div style={styles.formCheck}>
														<input type="radio" id="showInCashierNo" name="showInCashierRadio" checked={formData.showInCashier === false}
															onChange={() => handleRadioChange('showInCashier', false)} style={styles.radioInput} />
														<label htmlFor="showInCashierNo">Không</label>
													</div>
												</div>
											</div>
										</div>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label htmlFor="description" style={styles.label}>Mô tả:</label>
												<textarea id="description" name="description" rows="3" value={formData.description}
													onChange={handleChange} style={styles.textarea}></textarea>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Apply Tab */}
							{activeTab === 'apply' && (
								<div>
									<div style={styles.row}>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label style={styles.label}>Giới hạn dịch vụ áp dụng:</label>
												<div>
													<div style={{ ...styles.formCheck, marginBottom: '10px' }}>
														<input type="radio" id="totalOrder" name="serviceLimitRadio" checked={formData.serviceLimit === 'total'}
															onChange={() => handleRadioChange('serviceLimit', 'total')} style={styles.radioInput} />
														<label htmlFor="totalOrder">Tổng giá trị đơn hàng</label>
													</div>
													<div style={{ ...styles.formCheck, marginBottom: '10px' }}>
														<input type="radio" id="allServices" name="serviceLimitRadio" checked={formData.serviceLimit === 'allServices'}
															onChange={() => handleRadioChange('serviceLimit', 'allServices')} style={styles.radioInput} />
														<label htmlFor="allServices">Tất cả thể dịch vụ</label>
													</div>
													<div style={{ ...styles.formCheck, marginBottom: '10px' }}>
														<input type="radio" id="allProducts" name="serviceLimitRadio" checked={formData.serviceLimit === 'allProducts'}
															onChange={() => handleRadioChange('serviceLimit', 'allProducts')} style={styles.radioInput} />
														<label htmlFor="allProducts">Tất cả sản phẩm</label>
													</div>
													<div style={{ ...styles.formCheck, marginBottom: '10px' }}>
														<input type="radio" id="custom" name="serviceLimitRadio" checked={formData.serviceLimit === 'custom'}
															onChange={() => handleRadioChange('serviceLimit', 'custom')} style={styles.radioInput} />
														<label htmlFor="custom">Tùy chọn</label>
													</div>
												</div>
											</div>
										</div>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label htmlFor="usageLimit" style={styles.label}>Số lần tối đa 1 khách được dùng:</label>
												<div style={{ ...styles.flex, marginBottom: '10px' }}>
													<div style={styles.formCheck}>
														<input type="checkbox" id="unlimitedUsage" name="unlimitedUsage" checked={formData.unlimitedUsage}
															onChange={handleChange} style={styles.checkboxInput} />
														<label htmlFor="unlimitedUsage">Không giới hạn</label>
													</div>
													{!formData.unlimitedUsage && (
														<input type="number" id="usageLimit" name="usageLimit" value={formData.usageLimit}
															onChange={handleChange} style={{ ...styles.formControl, width: '80px', marginLeft: '10px' }} />
													)}
												</div>
											</div>
											<div style={styles.formGroup}>
												<label style={styles.label}>Áp dụng cho khách hàng cũ/mới:</label>
												<div style={{ display: 'flex' }}>
													<div style={styles.formCheck}>
														<input type="radio" id="allCustomers" name="customerTypeRadio" checked={formData.customerType === 'all'}
															onChange={() => handleRadioChange('customerType', 'all')} style={styles.radioInput} />
														<label htmlFor="allCustomers">Tất cả</label>
													</div>
													<div style={styles.formCheck}>
														<input type="radio" id="oldCustomers" name="customerTypeRadio" checked={formData.customerType === 'old'}
															onChange={() => handleRadioChange('customerType', 'old')} style={styles.radioInput} />
														<label htmlFor="oldCustomers">Khách cũ</label>
													</div>
													<div style={styles.formCheck}>
														<input type="radio" id="newCustomers" name="customerTypeRadio" checked={formData.customerType === 'new'}
															onChange={() => handleRadioChange('customerType', 'new')} style={styles.radioInput} />
														<label htmlFor="newCustomers">Khách mới</label>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div style={styles.formGroup}>
										<label style={styles.label}>Áp dụng hạng khách hàng:</label>
										<div style={styles.flex}>
											<input type="checkbox" id="customerRank" name="customerRank" checked={formData.customerRank}
												onChange={handleChange} style={styles.checkboxInput} />
											<label htmlFor="customerRank" style={{ marginRight: '20px' }}>Sử dụng</label>
											{formData.customerRank && (
												<select name="customerRankValue" value={formData.customerRankValue} onChange={handleChange}
													style={{ ...styles.formControl, flex: 1 }}>
													<option value="">Chọn hạng khách hàng</option>
													<option value="vip">VIP</option>
													<option value="regular">Thành viên</option>
													<option value="new">Mới</option>
												</select>
											)}
										</div>
									</div>

									<div style={styles.formGroup}>
										<label style={styles.label}>Áp dụng cho nhóm khách hàng:</label>
										<div style={styles.flex}>
											<input type="checkbox" id="customerGroup" name="customerGroup" checked={formData.customerGroup}
												onChange={handleChange} style={styles.checkboxInput} />
											<label htmlFor="customerGroup" style={{ marginRight: '20px' }}>Sử dụng</label>
											{formData.customerGroup && (
												<select name="customerGroupValue" value={formData.customerGroupValue} onChange={handleChange}
													style={{ ...styles.formControl, flex: 1 }}>
													<option value="">Chọn nhóm khách hàng</option>
													<option value="corporate">Doanh nghiệp</option>
													<option value="individual">Cá nhân</option>
												</select>
											)}
										</div>
									</div>

									<div style={styles.row}>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label style={styles.label}>Áp dụng cho loại lịch hẹn:</label>
												<div style={styles.flex}>
													<input type="checkbox" id="appointmentType" name="appointmentType" checked={formData.appointmentType}
														onChange={handleChange} style={styles.checkboxInput} />
													<label htmlFor="appointmentType" style={{ marginRight: '20px' }}>Sử dụng</label>
													{formData.appointmentType && (
														<select name="appointmentTypeValue" value={formData.appointmentTypeValue} onChange={handleChange}
															style={{ ...styles.formControl, flex: 1 }}>
															<option value="">Chọn loại lịch hẹn</option>
															<option value="online">Đặt online</option>
															<option value="phone">Đặt qua điện thoại</option>
															<option value="direct">Đặt trực tiếp</option>
														</select>
													)}
												</div>
											</div>
										</div>
										<div style={styles.col50}>
											<div style={styles.formGroup}>
												<label style={styles.label}>Áp dụng cho chi nhánh:</label>
												<div style={styles.flex}>
													<input type="checkbox" id="branch" name="branch" checked={formData.branch}
														onChange={handleChange} style={styles.checkboxInput} />
													<label htmlFor="branch" style={{ marginRight: '20px' }}>Sử dụng</label>
													{formData.branch && (
														<select name="branchValue" value={formData.branchValue} onChange={handleChange}
															style={{ ...styles.formControl, flex: 1 }}>
															<option value="">Chọn chi nhánh</option>
															<option value="main">Chi nhánh chính</option>
															<option value="branch1">Chi nhánh 1</option>
															<option value="branch2">Chi nhánh 2</option>
														</select>
													)}
												</div>
											</div>
										</div>
									</div>

									<div style={styles.formGroup}>
										<label style={styles.label}>Giới hạn khung giờ sử dụng:</label>
										<div style={styles.flex}>
											<input type="checkbox" id="timeLimit" name="timeLimit" checked={formData.timeLimit}
												onChange={handleChange} style={styles.checkboxInput} />
											<label htmlFor="timeLimit">Áp dụng giới hạn khung giờ</label>
										</div>
									</div>
								</div>
							)}

							<div className="modal-footer" style={styles.modalFooter}>
								<button type="button" onClick={onClose} style={{ ...styles.btn, ...styles.btnSecondary, marginRight: '12px' }}>
									Thoát
								</button>
								<button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>
									Lưu
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VoucherForm;