import React from 'react';
import { Link } from 'react-router-dom';

function VoucherList({ vouchers }) {
	return (
		<div className="table-responsive">
			<table className='table table-striped text-center align-middle mb-0' style={{ fontSize: '13px' }}>
				<thead style={{ backgroundColor: '#f8f9fa' }}>
					<tr>
						<th scope='col' className="py-2" style={{ width: '5%' }}>STT</th>
						<th scope='col' className="py-2 text-start">Tên voucher</th>
						<th scope='col' className="py-2">Bắt đầu</th>
						<th scope='col' className="py-2">Giá trị voucher</th>
						<th scope='col' className="py-2">Số lượng mã</th>
						<th scope='col' className="py-2">Trạng thái</th>
						<th scope='col' className="py-2">Mã voucher</th>
						<th scope='col' className="py-2">Giới hạn áp dụng</th>
						<th scope='col' className="py-2">Cập nhật</th>
						<th scope='col' className="py-2">Thao tác</th>
					</tr>
				</thead>
				<tbody>
					{vouchers.length > 0 ? (
						vouchers.map((voucher, index) => (
							<tr key={voucher.id}>
								<td>{index + 1}</td>
								<td className="text-start">{voucher.name}</td>
								<td>{voucher.startDate} - {voucher.endDate}</td>
								<td className={voucher.valueType === 'money' ? 'text-danger' : ''}>
									{voucher.valueType === 'money'
										? `${voucher.value.toLocaleString()} đ`
										: `${voucher.value} %`}
								</td>
								<td>{`${voucher.usedQuantity}/${voucher.quantity}`}</td>
								<td>
									<span className={`badge ${voucher.status === 'Hết hạn' ? 'bg-warning text-dark' : 'bg-success'}`}
										style={{ fontSize: '12px', padding: '5px 10px' }}>
										{voucher.status}
									</span>
								</td>
								<td>{voucher.code}</td>
								<td>{voucher.condition}</td>
								<td>
									<div>
										{voucher.updatedAt.split(' ')[0]}
									</div>
									<div className="text-muted" style={{ fontSize: '12px' }}>
										({voucher.updatedBy})
									</div>
								</td>
								<td>
									<div className="d-flex justify-content-center gap-2">
										<button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: '28px', height: '28px', padding: '0' }}>
											<i className="bi bi-pencil" style={{ fontSize: '12px' }}></i>
										</button>
										<button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: '28px', height: '28px', padding: '0' }}>
											<i className="bi bi-three-dots-vertical" style={{ fontSize: '12px' }}></i>
										</button>
									</div>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="10" className="text-center">Không có dữ liệu phiếu giảm giá.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default VoucherList;