import React from 'react';
import { Modal } from 'react-bootstrap';

const ImageModal = ({ show, onHide, imageUrl }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <img
                    src={imageUrl}
                    alt="Full size"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '80vh',
                        objectFit: 'contain'
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ImageModal;