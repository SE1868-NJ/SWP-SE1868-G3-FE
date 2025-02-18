import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '../../components/Card';

function AddSupplier() {
    const [supplier, setSupplier] = useState({
        name: '',
        deliveryTime: '',
        bankName: '',
        accountNumber: '',
        paymentTerm: '',
        address: '',
        contactName: '',
        phone: '',
        facebook: '',
        skype: '',
        note: '',
        status: 'Hoạt động'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nhà cung cấp mới:', supplier);
        navigate('/seller/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='fw-bold'>Thêm Nhà Cung Cấp</h2>
                <p className="text-muted fst-italic">Các trường có dấu <span className="text-danger">*</span> là bắt buộc.</p>
                <form onSubmit={handleSubmit}>

                    <h5 className="fw-bold text-decoration-underline">Thông Tin Cơ Bản</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Tên Nhà Cung Cấp <span className="text-danger">*</span></label>
                        <input type='text' name='name' className='form-control' onChange={handleChange} required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Thời Gian Giao Hàng (Ngày) <span className="text-danger">*</span></label>
                        <input type='number' name='deliveryTime' className='form-control' onChange={handleChange} required />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Thông Tin Giao Dịch</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Tên Ngân Hàng</label>
                        <input type='text' name='bankName' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Số Tài Khoản</label>
                        <input type='text' name='accountNumber' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Thời Hạn Thanh Toán</label>
                        <input type='text' name='paymentTerm' className='form-control' onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Địa Chỉ Nhà Cung Cấp</h5>
                    <div className='mb-3'>
                        <label className='form-label' >Địa Chỉ <span className="text-danger">*</span></label>
                        <input type='text' name='address' className='form-control' onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Thông Tin Liên Hệ</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Họ và Tên <span className="text-danger">*</span></label>
                        <input type='text' name='contactName' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Số Điện Thoại <span className="text-danger">*</span></label>
                        <input type='text' name='phone' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Facebook</label>
                        <input type='text' name='facebook' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Skype</label>
                        <input type='text' name='skype' className='form-control' onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold text-decoration-underline">Trạng Thái</h5>
                    <div className='mb-3'>
                        <select name='status' className='form-select' onChange={handleChange}>
                            <option value='Hoạt động'>Hoạt động</option>
                            <option value='Không hoạt động'>Không hoạt động</option>
                        </select>
                    </div>

                    <div className='d-flex gap-2'>
                        <button type='submit' className='btn btn-success'>Lưu</button>
                        <button type='button' className='btn btn-secondary' onClick={() => navigate('/seller/suppliers')}>Hủy</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

export default AddSupplier;
