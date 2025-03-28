import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../../../components/Card';
import SupplierHeader from '../../../components/Seller/Supplier/SupplierHeader';
import SupplierInfoTable from '../../../components/Seller/Supplier/SupplierInfoTable';
import SupplierNotificationModal from '../../../components/Modals/Seller/SupplierNotificationModal';
import supplierService from '../../../services/SellerServices/supplierService';

function ViewSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [modalStates, setModalStates] = useState({
    showDeleteConfirmModal: false,
    showDeleteSuccessModal: false,
    showDeleteErrorModal: false,
    showNotFoundModal: false
  });

  const modalMessages = {
    deleteConfirmMessage: 'Bạn có chắc chắn muốn xóa nhà cung cấp này không?',
    deleteSuccessMessage: 'Xóa nhà cung cấp thành công!',
    deleteErrorMessage: 'Lỗi khi xóa nhà cung cấp!',
    notFoundMessage: 'Nhà cung cấp không tồn tại!'
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await supplierService.getSupplierById(id);
        if (response) {
          setSupplier(response);
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

  const handleDelete = () => {
    toggleModal('showDeleteConfirmModal', true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await supplierService.deleteSupplier(id);
      toggleModal('showDeleteConfirmModal', false);
      toggleModal('showDeleteSuccessModal', true);
    } catch (error) {
      toggleModal('showDeleteConfirmModal', false);
      toggleModal('showDeleteErrorModal', true);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!supplier && !modalStates.showNotFoundModal) {
    return <div>Nhà cung cấp không tồn tại!</div>;
  }

  return (
    <div className="col-12">
      <Card>
        <Card.Body>
          <SupplierHeader title="Chi tiết Nhà Cung Cấp" subtitle="Dưới đây là thông tin chi tiết của nhà cung cấp." />
          <SupplierInfoTable supplier={supplier} readOnly={true} />
          <div className='d-flex gap-2 mt-3'>
            <button className='btn btn-danger' onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Đang xóa...' : 'Xóa'}
            </button>
            <button className='btn btn-secondary' onClick={() => navigate('/seller/suppliers')}>Quay lại</button>
          </div>
        </Card.Body>
      </Card>

      <SupplierNotificationModal
        modals={modalStates}
        messages={modalMessages}
        onClose={(modalName) => toggleModal(modalName, false)}
        onConfirm={confirmDelete}
        onNavigate={(path) => navigate(path)}
        navigatePath="/seller/suppliers"
      />
    </div>
  );
}

export default ViewSupplier;