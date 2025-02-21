
function SupplierInfoTable({ supplier, handleChange, errors = {}, readOnly = false }) {
  return (
    <>
      <h5 className="fw-bold text-decoration-underline">Thông Tin Cơ Bản</h5>
      <div className='mb-3'>
        <label className='form-label'>Tên Nhà Cung Cấp <span className="text-danger">*</span></label>
        <input
          type='text'
          name='supplier_name'
          className={`form-control ${errors.supplier_name ? 'is-invalid' : ''}`}
          value={supplier.supplier_name}
          onChange={handleChange}
          // required
          disabled={readOnly}
        />
        {errors.supplier_name && <div className="invalid-feedback">{errors.supplier_name}</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Thời Gian Giao Hàng (Ngày) <span className="text-danger">*</span></label>
        <input
          type='number'
          name='delivery_time'
          className={`form-control ${errors.delivery_time ? 'is-invalid' : ''}`}
          value={supplier.delivery_time}
          onChange={handleChange}
          // required
          disabled={readOnly}
        />
        {errors.delivery_time && <div className="invalid-feedback">{errors.delivery_time}</div>}
      </div>

      <h5 className="fw-bold text-decoration-underline">Thông Tin Giao Dịch</h5>
      <div className='mb-3'>
        <label className='form-label'>Tên Ngân Hàng</label>
        <input type='text' name='bank_name' className='form-control' value={supplier.bank_name} onChange={handleChange} disabled={readOnly} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Số Tài Khoản</label>
        <input type='text' name='account_number' className='form-control' value={supplier.account_number} onChange={handleChange} disabled={readOnly} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Thời Hạn Thanh Toán</label>
        <input type='text' name='payment_term' className='form-control' value={supplier.payment_term} onChange={handleChange} disabled={readOnly} />
      </div>

      <h5 className="fw-bold text-decoration-underline">Địa Chỉ Nhà Cung Cấp</h5>
      <div className='mb-3'>
        <label className='form-label'>Địa Chỉ <span className="text-danger">*</span></label>
        <input
          type='text'
          name='address'
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          value={supplier.address}
          onChange={handleChange}
          // required
          disabled={readOnly}
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>

      <h5 className="fw-bold text-decoration-underline">Thông Tin Liên Hệ</h5>
      <div className='mb-3'>
        <label className='form-label'>Họ và Tên <span className="text-danger">*</span></label>
        <input
          type='text'
          name='contact_name'
          className={`form-control ${errors.contact_name ? 'is-invalid' : ''}`}
          value={supplier.contact_name}
          onChange={handleChange}
          disabled={readOnly}
        />
        {errors.contact_name && <div className="invalid-feedback">{errors.contact_name}</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Số Điện Thoại <span className="text-danger">*</span></label>
        <input
          type='text'
          name='phone_number'
          className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
          value={supplier.phone_number}
          onChange={handleChange}
          disabled={readOnly}
        />
        {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Facebook</label>
        <input type='text' name='facebook' className='form-control' value={supplier.facebook} onChange={handleChange} disabled={readOnly} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Ghi chú</label>
        <input type='text' name='note' className='form-control' value={supplier.note} onChange={handleChange} disabled={readOnly} />
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

export default SupplierInfoTable;
