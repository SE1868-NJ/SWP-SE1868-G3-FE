import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from '../../components/Card';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierInfoTable from '../../components/Supplier/SupplierInfoTable';
import supplierService from '../../services/supplierService';
import { validateField, validateForm } from '../../utils/validation';

function AddSupplier() {
  const [supplier, setSupplier] = useState({
    supplier_name: '',
    delivery_time: '',
    bank_name: '',
    account_number: '',
    payment_term: '',
    address: '',
    contact_name: '',
    phone_number: '',
    note: '',
    status: 'Hoạt động'
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const errorRefs = useRef({});

  // Cập nhật ref của input lỗi khi lỗi thay đổi
  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      if (errors[field]) {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
          errorRefs.current[field] = input;
        }
      }
    });
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (error) {
      errorRefs.current[name] = e.target;
    } else {
      delete errorRefs.current[name];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(supplier);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField) {
        if (errorRefs.current[firstErrorField]) {
          errorRefs.current[firstErrorField].scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorRefs.current[firstErrorField].focus();
        }
      }
      return;
    }

    try {
      setLoading(true);
      await supplierService.createSupplier(supplier);
      alert('Thêm nhà cung cấp thành công!');
      navigate('/seller/suppliers');
    } catch (error) {
      alert('Thêm nhà cung cấp thất bại! Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <SupplierHeader title="Thêm Nhà Cung Cấp" subtitle="Vui lòng điền đầy đủ thông tin." showRequiredNote={true} />
        <form onSubmit={handleSubmit}>
          <SupplierInfoTable supplier={supplier} handleChange={handleChange} errors={errors} />
          <div className='d-flex gap-2'>
            <button type='submit' className='btn btn-success' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button type='button' className='btn btn-secondary' onClick={() => navigate('/seller/suppliers')}>Hủy</button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default AddSupplier;
