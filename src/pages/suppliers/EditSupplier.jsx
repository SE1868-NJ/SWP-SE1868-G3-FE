import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Card from '../../components/Card';

function EditSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const currentSupplier = storedSuppliers.find(s => s.id.trim() === id.trim());

    const [supplier, setSupplier] = useState(currentSupplier || null);

    useEffect(() => {
        if (!currentSupplier) {
            alert("Không tìm thấy nhà cung cấp! Quay lại danh sách.");
            navigate('/suppliers');
        }
    }, [currentSupplier, navigate]);

    if (!supplier) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedSuppliers = storedSuppliers.map(s => (s.id === supplier.id ? supplier : s));
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));

        console.log('Cập nhật nhà cung cấp:', supplier);
        navigate('/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='fw-bold'>Chỉnh sửa nhà cung cấp</h2>
                <p className="text-muted fst-italic">Các trường có dấu <span className="text-danger">*</span> là bắt buộc.</p>
                <form onSubmit={handleSubmit}>

                    <h5 className="fw-bold text-decoration-underline">Thông tin cơ bản</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Tên nhà cung cấp <span className="text-danger">*</span></label>
                        <input type='text' name='name' className='form-control' value={supplier.name} onChange={handleChange} required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Thời gian giao hàng (ngày) <span className="text-danger">*</span></label>
                        <input type='number' name='deliveryTime' className='form-control' value={supplier.deliveryTime} onChange={handleChange} required />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Thông tin giao dịch</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Tên ngân hàng</label>
                        <input type='text' name='bankName' className='form-control' value={supplier.bankName} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Số tài khoản</label>
                        <input type='text' name='accountNumber' className='form-control' value={supplier.accountNumber} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Thời hạn thanh toán</label>
                        <input type='text' name='paymentTerm' className='form-control' value={supplier.paymentTerm} onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Địa chỉ nhà cung cấp</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Địa chỉ <span className="text-danger">*</span></label>
                        <input type='text' name='address' className='form-control' value={supplier.address} onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Thông tin liên hệ</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Họ và tên <span className="text-danger">*</span></label>
                        <input type='text' name='contactName' className='form-control' value={supplier.contactName} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Số điện thoại <span className="text-danger">*</span></label>
                        <input type='text' name='phone' className='form-control' value={supplier.phone} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Facebook</label>
                        <input type='text' name='facebook' className='form-control' value={supplier.facebook} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Skype</label>
                        <input type='text' name='skype' className='form-control' value={supplier.skype} onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Trạng thái</h5>
                    <div className='mb-3'>
                        <select name='status' className='form-select' value={supplier.status} onChange={handleChange}>
                            <option value='Active'>Hoạt động</option>
                            <option value='Inactive'>Ngừng hoạt động</option>
                        </select>
                    </div>

                    <div className='d-flex gap-2'>
                        <button type='submit' className='btn btn-success'>Lưu</button>
                        <button type='button' className='btn btn-secondary' onClick={() => navigate('/suppliers')}>Hủy</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

export default EditSupplier;
