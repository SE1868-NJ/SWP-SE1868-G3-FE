import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function SupplierNotificationModal({
  modals,
  messages,
  onClose,
  onConfirm,
  onNavigate,
  navigatePath
}) {
  return (
    <>
      {/* Success Modal */}
      <Modal
        show={modals.showSuccessModal}
        onHide={() => onClose('showSuccessModal')}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messages.successMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              onClose('showSuccessModal');
              if (navigatePath) {
                onNavigate(navigatePath);
              }
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal
        show={modals.showErrorModal}
        onHide={() => onClose('showErrorModal')}
        centered
      >
        <Modal.Header>
          <Modal.Title>Lỗi</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messages.errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose('showErrorModal')}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Duplicate Code Error Modal */}
      <Modal
        show={modals.showDuplicateCodeModal}
        onHide={() => onClose('showDuplicateCodeModal')}
        centered
      >
        <Modal.Header>
          <Modal.Title>Lỗi</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messages.duplicateCodeMessage || 'Mã nhà cung cấp đã tồn tại. Vui lòng sử dụng mã khác.'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose('showDuplicateCodeModal')}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        show={modals.showCancelConfirmModal}
        onHide={() => onClose('showCancelConfirmModal')}
        centered
      >
        <Modal.Header>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messages.cancelMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onClose('showCancelConfirmModal')}
          >
            Không
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose('showCancelConfirmModal');
              if (navigatePath) {
                onNavigate(navigatePath);
              }
            }}
          >
            Có
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Not Found Modal */}
      {modals.showNotFoundModal && (
        <Modal
          show={modals.showNotFoundModal}
          onHide={() => onClose('showNotFoundModal')}
          centered
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>{messages.notFoundMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                onClose('showNotFoundModal');
                if (navigatePath) {
                  onNavigate(navigatePath);
                }
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {modals.showDeleteConfirmModal && (
        <Modal
          show={modals.showDeleteConfirmModal}
          onHide={() => onClose('showDeleteConfirmModal')}
          centered
        >
          <Modal.Header>
            <Modal.Title>Xác nhận</Modal.Title>
          </Modal.Header>
          <Modal.Body>{messages.deleteConfirmMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => onClose('showDeleteConfirmModal')}
            >
              Hủy
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
            >
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Success Modal */}
      {modals.showDeleteSuccessModal && (
        <Modal
          show={modals.showDeleteSuccessModal}
          onHide={() => onClose('showDeleteSuccessModal')}
          centered
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Thành công</Modal.Title>
          </Modal.Header>
          <Modal.Body>{messages.deleteSuccessMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                onClose('showDeleteSuccessModal');
                if (navigatePath) {
                  onNavigate(navigatePath);
                }
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Error Modal */}
      {modals.showDeleteErrorModal && (
        <Modal
          show={modals.showDeleteErrorModal}
          onHide={() => onClose('showDeleteErrorModal')}
          centered
        >
          <Modal.Header>
            <Modal.Title>Lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>{messages.deleteErrorMessage}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => onClose('showDeleteErrorModal')}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default SupplierNotificationModal;