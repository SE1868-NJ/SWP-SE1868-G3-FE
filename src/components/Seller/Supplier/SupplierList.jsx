import { Link } from 'react-router-dom';
import Card from '../../Card';

function SupplierList({ suppliers, editedId }) {
  return (
    <Card>
      <Card.Body>
        <table className='table table-striped text-center align-middle'>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th scope='col' className="fw-bold py-2" style={{ width: '5%' }}>#</th>
              <th scope='col' className="fw-bold py-2">Mã nhà cung cấp</th>
              <th scope='col' className="fw-bold py-2">Tên nhà cung cấp</th>
              <th scope='col' className="fw-bold py-2">Thời gian giao hàng (Ngày)</th>
              <th scope='col' className="fw-bold py-2">Địa chỉ nhà cung cấp</th>
              <th scope='col' className="fw-bold py-2">Thông tin liên hệ</th>
              <th scope='col' className="fw-bold py-2" style={{ width: '10%' }}>Trạng thái</th>
              <th scope='col' className="fw-bold py-2" style={{ width: '12%' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <tr key={supplier.supplier_id} className={supplier.supplier_id === editedId ? 'table-primary' : ''}>
                  <th scope='row'>{index + 1}</th>
                  <td>{supplier.supplier_code}</td>
                  <td>{supplier.supplier_name}</td>
                  <td>{supplier.delivery_time}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.phone_number || '-'}</td>
                  <td>
                    <span className={`badge ${supplier.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className='d-flex flex-column gap-1'>
                    <Link to={`/seller/suppliers/edit/${supplier.supplier_id}`} className='fw-bold text-decoration-none text-primary' style={{ whiteSpace: 'nowrap' }}>
                      Sửa
                    </Link>
                    <Link to={`/seller/suppliers/view/${supplier.supplier_id}`} className='fw-bold text-decoration-none text-primary' style={{ whiteSpace: 'nowrap' }}>
                      Xem thêm
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Không có dữ liệu nhà cung cấp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}

export default SupplierList;