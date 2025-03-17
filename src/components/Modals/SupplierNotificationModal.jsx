import React from 'react';
import { Modal } from 'react-bootstrap';

function SupplierNotificationModal({
  modals = {},
  messages = {},
  onClose,
  onConfirm,
  onNavigate,
  navigatePath = '/seller/suppliers'
}) {
  const {
    showSuccessModal = false,
    showErrorModal = false,
    showCancelConfirmModal = false,
    showDeleteConfirmModal = false,
    showDeleteSuccessModal = false,
    showDeleteErrorModal = false,
    showNotFoundModal = false
  } = modals;

  const {
    successMessage = 'Thao tác thành công!',
    errorMessage = 'Đã xảy ra lỗi!',
    cancelMessage = 'Bạn có chắc chắn muốn hủy? Mọi thay đổi sẽ không được lưu lại.',
    deleteConfirmMessage = 'Bạn có chắc chắn muốn xóa nhà cung cấp này không?',
    deleteSuccessMessage = 'Xóa nhà cung cấp thành công!',
    deleteErrorMessage = 'Lỗi khi xóa nhà cung cấp!',
    notFoundMessage = 'Nhà cung cấp không tồn tại!'
  } = messages;

  // Helper function to handle navigation or close
  const handleSuccessAction = () => {
    onClose('showSuccessModal');
    if (onNavigate) onNavigate(navigatePath);
  };

  const handleDeleteSuccessAction = () => {
    onClose('showDeleteSuccessModal');
    if (onNavigate) onNavigate(navigatePath);
  };

  const handleNotFoundAction = () => {
    onClose('showNotFoundModal');
    if (onNavigate) onNavigate(navigatePath);
  };

  return (
    <>
      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => handleSuccessAction()}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{successMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => handleSuccessAction()}
            >
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Error Modal */}
      <Modal
        show={showErrorModal}
        onHide={() => onClose('showErrorModal')}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{errorMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-danger"
              onClick={() => onClose('showErrorModal')}
            >
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        show={showCancelConfirmModal}
        onHide={() => onClose('showCancelConfirmModal')}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{cancelMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => onClose('showCancelConfirmModal')}
            >
              Quay lại
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onNavigate(navigatePath)}
            >
              Có
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmModal}
        onHide={() => onClose('showDeleteConfirmModal')}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{deleteConfirmMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => onClose('showDeleteConfirmModal')}
            >
              Quay lại
            </button>
            <button
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Có
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Success Modal */}
      <Modal
        show={showDeleteSuccessModal}
        onHide={() => handleDeleteSuccessAction()}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{deleteSuccessMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => handleDeleteSuccessAction()}
            >
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Error Modal */}
      <Modal
        show={showDeleteErrorModal}
        onHide={() => onClose('showDeleteErrorModal')}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{deleteErrorMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-danger"
              onClick={() => onClose('showDeleteErrorModal')}
            >
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Not Found Modal */}
      <Modal
        show={showNotFoundModal}
        onHide={() => handleNotFoundAction()}
        centered
      >
        <Modal.Body className="text-center p-4">
          <p>{notFoundMessage}</p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              onClick={() => handleNotFoundAction()}
            >
              Quay lại
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SupplierNotificationModal;