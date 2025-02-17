import React from 'react';
import { Toast } from 'react-bootstrap';

const NotificationToast = ({ show, message, onClose, variant = 'success' }) => {
    return (
        <div
            className="position-fixed"
            style={{
                top: 20,
                right: 20,
                zIndex: 9999
            }}
        >
            <Toast
                show={show}
                onClose={onClose}
                bg={variant}
                autohide
                delay={3000}
            >
                <Toast.Header>
                    <strong className="me-auto">Thông báo</strong>
                    <small>vừa xong</small>
                </Toast.Header>
                <Toast.Body className={variant === 'success' ? 'text-white' : ''}>
                    {message}
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default NotificationToast;