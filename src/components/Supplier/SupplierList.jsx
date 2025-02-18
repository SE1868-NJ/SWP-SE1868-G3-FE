import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../Card';

function SupplierList({ suppliers }) {
    return (
        <Card>
            <Card.Body>
                <table className='table table-striped text-center align-middle'>
                    <thead style={{ backgroundColor: '#f0f0f0' }}>
                        <tr>
                            <th scope='col' className="fw-bold py-2" style={{ width: '5%' }}>#</th>
                            <th scope='col' className="fw-bold py-2">Tên nhà cung cấp</th>
                            <th scope='col' className="fw-bold py-2">Mã nhà cung cấp</th>
                            <th scope='col' className="fw-bold py-2">Thời gian giao hàng (Ngày)</th>
                            <th scope='col' className="fw-bold py-2">Địa chỉ nhà cung cấp</th>
                            <th scope='col' className="fw-bold py-2">Thông tin liên hệ</th>
                            <th scope='col' className="fw-bold py-2">Ghi chú</th>
                            <th scope='col' className="fw-bold py-2" style={{ width: '10%' }}>Trạng thái</th>
                            <th scope='col' className="fw-bold py-2" style={{ width: '12%' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.length > 0 ? (
                            suppliers.map((supplier, index) => (
                                <tr key={supplier.id}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.id}</td>
                                    <td>{supplier.deliveryTime}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.contactInfo || '-'}</td>
                                    <td>{supplier.note || '-'}</td>
                                    <td>
                                        <span className={`badge ${supplier.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}`}>
                                            {supplier.status}
                                        </span>
                                    </td>
                                    <td className='d-flex flex-column gap-1'>
                                        <Link to={`/suppliers/edit/${supplier.id}`} className='fw-bold text-decoration-none text-primary' style={{ whiteSpace: 'nowrap' }}>
                                            Sửa
                                        </Link>
                                        <Link to={`/suppliers/view/${supplier.id}`} className='fw-bold text-decoration-none text-primary' style={{ whiteSpace: 'nowrap' }}>
                                            Xem thêm
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">Không có dữ liệu nhà cung cấp.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
}

SupplierList.propTypes = {
    suppliers: PropTypes.array.isRequired,
};

export default SupplierList;
