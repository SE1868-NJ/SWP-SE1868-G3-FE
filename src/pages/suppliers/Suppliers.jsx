import { Link } from 'react-router';
import { useEffect } from 'react';
import Card from '../../components/Card';

function Suppliers() {
    const suppliers = [
        { id: 'VNSUP21069449274327216', name: 'Nhà cung cấp Z (D)', deliveryTime: 3, address: 'Hà Nội', contactInfo: '1 Thông tin liên hệ', note: '-', status: 'Hoạt động' },
        { id: 'VNSUP21068012216352816', name: 'Nhà cung cấp B', deliveryTime: 10, address: 'Hồ Chí Minh', contactInfo: '3 Thông tin liên hệ', note: '-', status: 'Hoạt động' },
        { id: 'VNSUP21061096303083568', name: 'Nhà cung cấp A', deliveryTime: 10, address: '-', contactInfo: '-', note: '-', status: 'Ngừng Hoạt động' }
    ];

    useEffect(() => {
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
    });

    return (
        <>
            <div className='mb-3'>
                <h2 className='fw-bold'>Quản lý nhà cung cấp</h2>
                <p className='text-muted fst-italic'>Quản lý thông tin liên quan đến nhà cung cấp. Chỉ có quyền Quản lý mới có thể truy cập tính năng này.</p>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='d-flex gap-2 w-50'>
                    <select className='form-select'>
                        <option>Nhà cung cấp</option>
                    </select>
                    <input type='search' name='search' className='form-control' placeholder='Nhập từ khóa tìm kiếm...' />
                    <button type='submit' className='btn btn-danger'>Tìm kiếm</button>
                </div>
                <Link to='/suppliers/add' className='btn btn-danger'>
                    + Thêm nhà cung cấp
                </Link>
            </div>
            <Card>
                <Card.Body>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Nhà cung cấp</th>
                                <th scope='col'>Mã nhà cung cấp</th>
                                <th scope='col'>Thời gian giao hàng (Ngày)</th>
                                <th scope='col'>Địa chỉ nhà cung cấp</th>
                                <th scope='col'>Thông tin liên hệ</th>
                                <th scope='col'>Ghi chú</th>
                                <th scope='col'>Trạng thái</th>
                                <th scope='col'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier, index) => (
                                <tr key={supplier.id}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.id}</td>
                                    <td>{supplier.deliveryTime}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.contactInfo}</td>
                                    <td>{supplier.note}</td>
                                    <td>
                                        <span className={`badge ${supplier.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}`}>
                                            {supplier.status}
                                        </span>
                                    </td>
                                    <td className='d-flex flex-column'>
                                        <Link to={`/suppliers/edit/${supplier.id}`} className='fw-bold text-decoration-none text-primary' style={{ whiteSpace: 'nowrap' }}>
                                            Sửa
                                        </Link>
                                        <Link to={`/suppliers/view/${supplier.id}`} className='fw-bold text-decoration-none text-primary' style={{ whiteSpace: 'nowrap' }}>
                                            Xem thêm
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </>
    );
}

export default Suppliers;
