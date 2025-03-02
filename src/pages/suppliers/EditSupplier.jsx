import { useParams, useNavigate } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import Card from '../../components/Card';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierInfoTable from '../../components/Supplier/SupplierInfoTable';
import supplierService from '../../services/supplierService';
import { validateField, validateForm } from '../../utils/validation';

function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const errorRefs = useRef({});

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await supplierService.getSupplierById(id);
        if (response) {
          setSupplier(response);
        }
      } catch (error) {
        navigate('/seller/suppliers');
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [id, navigate]);

  if (!supplier) {
    return <h2 className="text-center mt-5">Nhà cung cấp không tồn tại!</h2>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (error) errorRefs.current[name] = e.target;
    else delete errorRefs.current[name];
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
      await supplierService.updateSupplier(id, supplier);
      alert("Cập nhật thành công!");
      navigate('/seller/suppliers');
    } catch (error) {
      alert("Lỗi khi cập nhật nhà cung cấp!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card>
      <Card.Body>
        <SupplierHeader title="Chỉnh sửa Nhà Cung Cấp" subtitle="Vui lòng điền đầy đủ thông tin." showRequiredNote={true} />
        <form onSubmit={handleSubmit}>
          <SupplierInfoTable supplier={supplier} handleChange={handleChange} errors={errors} readOnly={false} />
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

export default EditSupplier;
