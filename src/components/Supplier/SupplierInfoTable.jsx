import PropTypes from 'prop-types';

function SupplierInfoTable({ supplier, handleChange, errors = {}, readOnly = false }) {
    return (
        <>
            <h5 className="fw-bold text-decoration-underline">Thông Tin Cơ Bản</h5>
            <div className='mb-3'>
                <label className='form-label'>Tên Nhà Cung Cấp <span className="text-danger">*</span></label>
                <input
                    type='text'
                    name='name'
                    className='form-control'
                    value={supplier.name}
                    onChange={handleChange}
                    required
                    disabled={readOnly}
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'>Thời Gian Giao Hàng (Ngày) <span className="text-danger">*</span></label>
                <input
                    type='number'
                    name='deliveryTime'
                    className='form-control'
                    value={supplier.deliveryTime}
                    onChange={handleChange}
                    required
                    disabled={readOnly}
                />
                {errors.deliveryTime && <div className="text-danger">{errors.deliveryTime}</div>}
            </div>

            <h5 className="fw-bold text-decoration-underline">Thông Tin Giao Dịch</h5>
            <div className='mb-3'>
                <label className='form-label'>Tên Ngân Hàng</label>
                <input type='text' name='bankName' className='form-control' value={supplier.bankName} onChange={handleChange} disabled={readOnly} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Số Tài Khoản</label>
                <input type='text' name='accountNumber' className='form-control' value={supplier.accountNumber} onChange={handleChange} disabled={readOnly} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Thời Hạn Thanh Toán</label>
                <input type='text' name='paymentTerm' className='form-control' value={supplier.paymentTerm} onChange={handleChange} disabled={readOnly} />
            </div>

            <h5 className="fw-bold text-decoration-underline">Địa Chỉ Nhà Cung Cấp</h5>
            <div className='mb-3'>
                <label className='form-label'>Địa Chỉ <span className="text-danger">*</span></label>
                <input
                    type='text'
                    name='address'
                    className='form-control'
                    value={supplier.address}
                    onChange={handleChange}
                    disabled={readOnly}
                />
                {errors.address && <div className="text-danger">{errors.address}</div>}
            </div>

            <h5 className="fw-bold text-decoration-underline">Thông Tin Liên Hệ</h5>
            <div className='mb-3'>
                <label className='form-label'>Họ và Tên <span className="text-danger">*</span></label>
                <input
                    type='text'
                    name='contactName'
                    className='form-control'
                    value={supplier.contactName}
                    onChange={handleChange}
                    disabled={readOnly}
                />
                {errors.contactName && <div className="text-danger">{errors.contactName}</div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'>Số Điện Thoại <span className="text-danger">*</span></label>
                <input
                    type='text'
                    name='phone'
                    className='form-control'
                    value={supplier.phone}
                    onChange={handleChange}
                    disabled={readOnly}
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'>Facebook</label>
                <input type='text' name='facebook' className='form-control' value={supplier.facebook} onChange={handleChange} disabled={readOnly} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Skype</label>
                <input type='text' name='skype' className='form-control' value={supplier.skype} onChange={handleChange} disabled={readOnly} />
            </div>

            <h5 className="fw-bold text-decoration-underline">Trạng Thái</h5>
            <div className='mb-3'>
                <select name='status' className='form-select' value={supplier.status} onChange={handleChange} disabled={readOnly}>
                    <option value='Hoạt động'>Hoạt động</option>
                    <option value='Không hoạt động'>Không hoạt động</option>
                </select>
            </div>
        </>
    );
}

SupplierInfoTable.propTypes = {
    supplier: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    readOnly: PropTypes.bool
};

export default SupplierInfoTable;
