import { useParams, useNavigate } from 'react-router';
import Card from '../../components/Card';

function ViewSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const currentSupplier = storedSuppliers.find(s => s.id.trim() === id.trim());

    const supplier = currentSupplier || null;

    if (!supplier) return null;

    const handleDelete = () => {
        const updatedSuppliers = storedSuppliers.filter(s => s.id !== id);
        localStorage.setItem('/seller/suppliers', JSON.stringify(updatedSuppliers));
        navigate('/seller/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='fw-bold'>Chi tiết nhà cung cấp</h2>
                <p className="text-muted fst-italic">Dưới đây là thông tin chi tiết của nhà cung cấp.</p>

                <h5 className="fw-bold text-decoration-underline">Thông tin cơ bản</h5>
                <p><strong>Tên nhà cung cấp:</strong> {supplier.name}</p>
                <p><strong>ID nhà cung cấp:</strong> {supplier.id}</p>
                <p><strong>Thời gian giao hàng:</strong> {supplier.deliveryTime} ngày</p>

                <h5 className="fw-bold text-decoration-underline">Thông tin giao dịch</h5>
                <p><strong>Tên ngân hàng:</strong> {supplier.bankName || 'Không có'}</p>
                <p><strong>Số tài khoản:</strong> {supplier.accountNumber || 'Không có'}</p>
                <p><strong>Thời hạn thanh toán:</strong> {supplier.paymentTerm || 'Không có'}</p>

                <h5 className="fw-bold text-decoration-underline">Địa chỉ nhà cung cấp</h5>
                <p><strong>Địa chỉ:</strong> {supplier.address || 'Không có'}</p>

                <h5 className="fw-bold text-decoration-underline">Thông tin liên hệ</h5>
                <p><strong>Họ và tên:</strong> {supplier.contactName || 'Không có'}</p>
                <p><strong>Số điện thoại:</strong> {supplier.phone || 'Không có'}</p>
                <p><strong>Facebook:</strong> {supplier.facebook || 'Không có'}</p>
                <p><strong>Skype:</strong> {supplier.skype || 'Không có'}</p>

                <h5 className="fw-bold text-decoration-underline">Trạng thái</h5>
                <p>
                    <span className={`badge ${supplier.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}`}>
                        {supplier.status === 'Hoạt động' ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </span>
                </p>

                <h5 className="fw-bold text-decoration-underline">Ghi chú thêm</h5>
                <p>{supplier.note || 'Không có ghi chú thêm.'}</p>

                <div className='d-flex gap-2 mt-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>Xóa</button>
                    <button className='btn btn-secondary' onClick={() => navigate('/suppliers')}>Quay lại</button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ViewSupplier;
