import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from '../../../components/Card';
import SupplierHeader from '../../../components/Seller/Supplier/SupplierHeader';
import SupplierInfoTable from '../../../components/Seller/Supplier/SupplierInfoTable';
import SupplierNotificationModal from '../../../components/Modals/Seller/SupplierNotificationModal';
import supplierService from '../../../services/SellerServices/supplierService';
import { validateField, validateForm } from '../../../utils/validation';

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

  const [modalStates, setModalStates] = useState({
    showSuccessModal: false,
    showErrorModal: false,
    showCancelConfirmModal: false
  });

  const modalMessages = {
    successMessage: 'Thêm nhà cung cấp thành công!',
    errorMessage: 'Thêm nhà cung cấp thất bại! Vui lòng thử lại.',
    cancelMessage: 'Bạn có chắc chắn muốn hủy? Mọi thông tin sẽ không được lưu lại.'
  };

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
      toggleModal('showSuccessModal', true);
    } catch (error) {
      toggleModal('showErrorModal', true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toggleModal('showCancelConfirmModal', true);
  };

  const toggleModal = (modalName, isOpen = true) => {
    setModalStates(prev => ({ ...prev, [modalName]: isOpen }));
  };

  return (
    <div className="col-12">
      <Card>
        <Card.Body>
          <SupplierHeader title="Thêm Nhà Cung Cấp" subtitle="Nhập thông tin nhà cung cấp mới" showRequiredNote={true} />
          <form onSubmit={handleSubmit}>
            <SupplierInfoTable supplier={supplier} handleChange={handleChange} errors={errors} />
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-primary me-2" disabled={loading} >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel} >Hủy</button>
            </div>
          </form>
        </Card.Body>
      </Card>

      <SupplierNotificationModal
        modals={modalStates}
        messages={modalMessages}
        onClose={(modalName) => toggleModal(modalName, false)}
        onNavigate={(path) => navigate(path)}
        navigatePath="/seller/suppliers"
      />
    </div>
  );
}

export default AddSupplier;