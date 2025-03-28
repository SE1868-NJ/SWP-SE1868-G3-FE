// src/pages/PaymentResultPage.js

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Sử dụng hook từ react-router-dom v6
// Import biểu tượng Bootstrap Icons nếu muốn dùng (cần cài đặt: npm install bootstrap-icons)
// import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentResultPage = () => {
    const [searchParams] = useSearchParams();
    const [paymentResult, setPaymentResult] = useState({
        status: 'loading', // 'loading', 'success', 'error'
        message: 'Đang xử lý kết quả thanh toán...',
        orderId: null,
        amount: null,
        responseCode: null, // Thêm để lưu mã lỗi VNPay nếu có
    });

    useEffect(() => {
        const success = searchParams.get('success');
        const message = searchParams.get('message');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');
        // Lấy thêm mã lỗi từ message nếu có (ví dụ format: "...(Mã lỗi: XX)")
        const errorCodeMatch = message?.match(/\(Mã lỗi: (\w+)\)/);
        const responseCode = errorCodeMatch ? errorCodeMatch[1] : null;

        if (success !== null) {
            if (success === 'true') {
                setPaymentResult({
                    status: 'success',
                    message: message || 'Thanh toán thành công!',
                    orderId: orderId,
                    amount: amount ? parseFloat(amount) : null,
                    responseCode: '00', // Mã thành công của VNPay
                });
            } else {
                setPaymentResult({
                    status: 'error',
                    message: message || 'Thanh toán thất bại hoặc bị hủy.',
                    orderId: orderId,
                    amount: null,
                    responseCode: responseCode,
                });
            }
        } else {
            setPaymentResult({
                status: 'error',
                message: 'Không thể xác định kết quả thanh toán. Vui lòng kiểm tra lại đơn hàng.',
                orderId: orderId,
                amount: null,
                responseCode: null,
            });
            console.error('Missing "success" query parameter in payment result URL.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatCurrency = (value) => {
        if (value === null || isNaN(value)) return '';
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    // Hàm lấy mô tả lỗi VNPay (ví dụ - bạn có thể mở rộng)
    const getVnpayErrorMessage = (code) => {
        switch (code) {
            case '07': return 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên hệ VNPAY).';
            case '09': return 'Thẻ/Tài khoản chưa đăng ký Internet Banking tại Ngân hàng.';
            case '10': return 'Thẻ/Tài khoản xác thực không đúng/quá số lần.';
            case '11': return 'Giao dịch chờ trả kết quả từ Ngân hàng.';
            case '12': return 'Thẻ/Tài khoản bị khoá.';
            case '13': return 'OTP nhập không đúng/quá số lần quy định.';
            case '24': return 'Giao dịch bị hủy bởi người dùng.';
            case '51': return 'Tài khoản không đủ số dư.';
            case '65': return 'Tài khoản đã vượt quá hạn mức giao dịch trong ngày.';
            case '75': return 'Ngân hàng bảo trì.';
            case '99': return 'Lỗi không xác định.';
            default: return `(Mã lỗi: ${code})`;
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center py-5 min-vh-75">
            {paymentResult.status === 'loading' && (
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h2>Đang xử lý...</h2>
                    <p className="text-muted">{paymentResult.message}</p>
                </div>
            )}

            {paymentResult.status === 'success' && (
                <div className="col-11 col-md-8 col-lg-6">
                    <div className="card text-center shadow-sm border-top border-5 border-success">
                        <div className="card-body p-5">
                            {/* Biểu tượng thành công (Bootstrap Icons) */}
                            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                            {/* Hoặc dùng SVG */}
                            {/* <svg className="text-success mb-3" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> */}

                            <h2 className="card-title text-success mt-3">Thanh toán thành công!</h2>
                            <p className="card-text text-muted mb-3">{paymentResult.message}</p>
                            {paymentResult.orderId && <p className="card-text">Mã tham chiếu: <strong>{paymentResult.orderId}</strong></p>}
                            {paymentResult.amount !== null && <p className="card-text">Số tiền: <strong>{formatCurrency(paymentResult.amount)}</strong></p>}

                            <p className="card-text text-muted fst-italic mt-4 pt-3 border-top small">
                                Lưu ý: Đây là kết quả tạm thời. Trạng thái cuối cùng của đơn hàng sẽ được cập nhật sau khi hệ thống xác nhận từ VNPay (qua IPN).
                            </p>
                            <div className="mt-4">
                                <Link to="/orders" className="btn btn-primary mx-2">Xem lịch sử đơn hàng</Link>
                                <Link to="/" className="btn btn-outline-secondary mx-2">Tiếp tục mua sắm</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {paymentResult.status === 'error' && (
                 <div className="col-11 col-md-8 col-lg-6">
                    <div className="card text-center shadow-sm border-top border-5 border-danger">
                         <div className="card-body p-5">
                            {/* Biểu tượng lỗi (Bootstrap Icons) */}
                            <i className="bi bi-x-octagon-fill text-danger" style={{ fontSize: '4rem' }}></i>
                             {/* Hoặc dùng SVG */}
                            {/* <svg className="text-danger mb-3" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> */}

                            <h2 className="card-title text-danger mt-3">Thanh toán thất bại!</h2>
                            <p className="card-text text-danger mb-3">
                                {paymentResult.message}
                                {paymentResult.responseCode && paymentResult.responseCode !== '00' && ` - ${getVnpayErrorMessage(paymentResult.responseCode)}`}
                            </p>
                             {paymentResult.orderId && paymentResult.orderId !== 'unknown' && <p className="card-text text-muted">Mã tham chiếu: <strong>{paymentResult.orderId}</strong></p>}

                            <div className="mt-4">
                                <Link to="/cart" className="btn btn-secondary mx-2">Quay lại giỏ hàng</Link>
                                <Link to="/" className="btn btn-outline-secondary mx-2">Về trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentResultPage;