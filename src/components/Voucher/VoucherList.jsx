import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';

function VoucherList({ vouchers }) {
	return (
		<Card>
			<Card.Body>
				<table className='table table-striped text-center align-middle' style={{ fontSize: '13px' }}>
					<thead style={{ backgroundColor: '#f0f0f0' }}>
						<tr>
							<th scope='col' className="fw-bold py-2" style={{ width: '5%' }}>#</th>
							<th scope='col' className="fw-bold py-2">Tên phiếu giảm giá</th>
							<th scope='col' className="fw-bold py-2">Bắt đầu</th>
							<th scope='col' className="fw-bold py-2">Kết thúc</th>
							<th scope='col' className="fw-bold py-2">Giá trị</th>
							<th scope='col' className="fw-bold py-2">Số lượng</th>
							<th scope='col' className="fw-bold py-2" style={{ width: '10%' }}>Trạng thái</th>
							<th scope='col' className="fw-bold py-2">Mã phiếu giảm giá</th>
							<th scope='col' className="fw-bold py-2">Điều kiện áp dụng</th>
							<th scope='col' className="fw-bold py-2">Cập nhật</th>
							<th scope='col' className="fw-bold py-2" style={{ width: '12%' }}>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{vouchers.length > 0 ? (
							vouchers.map((voucher, index) => (
								<tr key={voucher.id}>
									<th scope='row'>{index + 1}</th>
									<td>{voucher.name}</td>
									<td>{voucher.startDate}</td>
									<td>{voucher.endDate}</td>
									<td>
										{voucher.valueType === 'money'
											? `${voucher.value.toLocaleString()} đ`
											: `${voucher.value}%`}
									</td>
									<td>{`${voucher.usedQuantity}/${voucher.quantity}`}</td>
									<td>
										<span className={`badge ${voucher.status === 'Hết hạn' ? 'bg-danger' : 'bg-success'}`}>
											{voucher.status}
										</span>
									</td>
									<td>{voucher.code}</td>
									<td>{voucher.condition}</td>
									<td>{`${voucher.updatedAt} (${voucher.updatedBy})`}</td>
									<td className='d-flex flex-column gap-3'>
										<Link
											to={`/seller/vouchers/edit/${voucher.id}`}
											className='fw-bold text-decoration-none text-primary'
											style={{ whiteSpace: 'nowrap', fontSize: '12px' }}
										>
											Sửa
										</Link>
										<Link
											to={`/seller/vouchers/view/${voucher.id}`}
											className='fw-bold text-decoration-none text-primary'
											style={{ whiteSpace: 'nowrap', fontSize: '12px' }}
										>
											Xem
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="11" className="text-center">Không có dữ liệu phiếu giảm giá.</td>
							</tr>
						)}
					</tbody>
				</table>
			</Card.Body>
		</Card>
	);
}

export default VoucherList;