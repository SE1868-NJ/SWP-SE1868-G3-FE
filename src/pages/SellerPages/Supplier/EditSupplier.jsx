import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Card from '../../../components/Card';
import SupplierHeader from '../../../components/Seller/Supplier/SupplierHeader';
import SupplierInfoTable from '../../../components/Seller/Supplier/SupplierInfoTable';
import SupplierNotificationModal from '../../../components/Modals/Seller/SupplierNotificationModal';
import supplierService from '../../../services/SellerServices/supplierService';
import { validateField, validateForm } from '../../../utils/validation';

function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const errorRefs = useRef({});
  const originalSupplierRef = useRef(null);

  const [modalStates, setModalStates] = useState({
    showSuccessModal: false,
    showErrorModal: false,
    showDuplicateCodeModal: false,
    showCancelConfirmModal: false,
    showNotFoundModal: false
  });

  const modalMessages = {
    successMessage: 'Cập nhật nhà cung cấp thành công!',
    errorMessage: 'Lỗi khi cập nhật nhà cung cấp!',
    duplicateCodeMessage: 'Mã nhà cung cấp đã tồn tại! Vui lòng sử dụng mã khác.',
    cancelMessage: 'Bạn có chắc chắn muốn hủy? Mọi thay đổi sẽ không được lưu lại.',
    notFoundMessage: 'Nhà cung cấp không tồn tại!'
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await supplierService.getSupplierById(id);
        if (response) {
          setSupplier(response);
          originalSupplierRef.current = { ...response };
        } else {
          toggleModal('showNotFoundModal', true);
        }
      } catch (error) {
        toggleModal('showNotFoundModal', true);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [id]);

  const toggleModal = (modalName, isOpen = true) => {
    setModalStates(prev => ({ ...prev, [modalName]: isOpen }));
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

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!supplier && !modalStates.showNotFoundModal) {
    return <div>Nhà cung cấp không tồn tại!</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'supplier_code') {
      return;
    }
    setSupplier({ ...supplier, [name]: value });
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if (error) errorRefs.current[name] = e.target;
    else delete errorRefs.current[name];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supplierToSubmit = {
      ...supplier,
      supplier_code: originalSupplierRef.current.supplier_code
    };
    const newErrors = validateForm(supplierToSubmit);
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
      setSaving(true);
      const result = await supplierService.updateSupplier(id, supplierToSubmit);
      if (result) {
        sessionStorage.setItem('editedSupplierId', id.toString());
        toggleModal('showSuccessModal', true);
      } else {
        toggleModal('showErrorModal', true);
      }
    } catch (error) {
      // Kiểm tra nếu lỗi là do trùng mã nhà cung cấp
      if (error.response && error.response.data &&
        (error.response.data.message === 'duplicate_supplier_code' ||
          error.response.data.message.includes('duplicate'))) {
        toggleModal('showDuplicateCodeModal', true);
      } else {
        toggleModal('showErrorModal', true);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    toggleModal('showCancelConfirmModal', true);
  };

  return (
    <div className="col-12">
      <Card>
        <Card.Body>
          <SupplierHeader title="Chỉnh Sửa Nhà Cung Cấp" subtitle="Cập nhật thông tin nhà cung cấp." showRequiredNote={true} />
          <form onSubmit={handleSubmit}>
            <SupplierInfoTable supplier={supplier} handleChange={handleChange} errors={errors} />
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-primary me-2" disabled={saving} >
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Hủy</button>
            </div>
          </form>
        </Card.Body>
      </Card>

      <SupplierNotificationModal
        modals={modalStates}
        messages={modalMessages}
        onClose={(modalName) => {
          toggleModal(modalName, false);
          if (modalName === 'showSuccessModal') {
            navigate('/seller/suppliers');
          }
        }}
        onNavigate={(path) => navigate(path)}
        navigatePath="/seller/suppliers"
      />
    </div>
  );
}

export default EditSupplier;