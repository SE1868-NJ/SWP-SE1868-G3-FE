import React from 'react';

const getStatusText = (status) => {
	switch (status) {
		case 'completed':
			return 'Hoàn Thành';
		case 'processing':
			return 'Đang Xử Lý';
		case 'new':
			return 'Chờ xử lý';
		case 'cancelled':
			return 'Đã Hủy';
	}
};

const getStatusStyle = (status) => {
	switch (status) {
		case 'completed':
			return { backgroundColor: '#198754', color: 'white' };
		case 'processing':
			return { backgroundColor: '#0d6efd', color: 'white' };
		case 'new':
			return { backgroundColor: '#ffc107', color: 'white' };
		case 'cancelled':
			return { backgroundColor: '#dc3545', color: 'white' };
	}
};

const OrderTable = ({ orders }) => {
	return (
		<div className='card h-100 shadow-sm'>
			<div className='card-header d-flex justify-content-between align-items-center bg-white'>
				<h4 className='mb-0 fw-bold' style={{ color: '#2c3e50' }}>
					Đơn Hàng Gần Đây
				</h4>
				<a
					href='/seller/orders/new'
					className='btn btn-sm fw-medium'
					style={{ backgroundColor: '#34495e', color: 'white' }}
				>
					<i className='bi bi-arrow-right-circle me-1'></i>
					Xem Đơn Mới
				</a>
			</div>
			<div className='card-body'>
				<div className='table-responsive'>
					<table className='table table-hover'>
						<thead>
							<tr style={{ backgroundColor: '#ecf0f1' }}>
								<th>Mã Đơn</th>
								<th>Khách Hàng</th>
								<th>Tổng Tiền</th>
								<th>Trạng Thái</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr key={index}>
									<td className='fw-medium'>{order.orderCode}</td>
									<td>{order.customerName}</td>
									<td className='fw-medium'>{order.totalAmount}</td>
									<td>
										<span
											className='badge'
											style={getStatusStyle(order.status.toLowerCase())}
										>
											{getStatusText(order.status.toLowerCase())}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{orders.length === 0 && (
					<div className='text-center py-5'>
						<img
							src='/placeholder-empty.png'
							alt='Không có dữ liệu'
							style={{ width: '100px', opacity: 0.5 }}
							onError={(e) => {
								e.target.src =
									'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yNSAyNUg3NVY3NUgyNVoiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSI1LDUiLz48cGF0aCBkPSJNNDAgNDBMNjAgNjBNNjAgNDBMNDAgNjAiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+';
							}}
						/>
						<p className='text-muted mt-3'>Không có dữ liệu</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderTable;
