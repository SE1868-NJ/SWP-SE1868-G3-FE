import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { paymentService } from '../services/paymentService';

const PaymentResultPage = () => {
    const [searchParams] = useSearchParams();
    const [paymentResult, setPaymentResult] = useState({
        status: 'loading',
        message: 'Đang xử lý kết quả thanh toán...',
        orderId: null,
        amount: null,
        responseCode: null,
    });

    useEffect(() => {
        const success = searchParams.get('success');
        const message = searchParams.get('message');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');
        const responseCode = searchParams.get('responseCode');

        const handleResultPayment = async (payload) => {
            await paymentService.handleResultPayment(payload);
        }
        const errorCodeMatch = message?.match(/\(Mã lỗi: (\w+)\)/);
        // const responseCode = errorCodeMatch ? errorCodeMatch[1] : null;

        const payload = {
            orderId: orderId,
            responseCode: responseCode,
            amount: amount,
        }

        handleResultPayment(payload);
        if (success !== null) {
            if (success === 'true') {
                setPaymentResult({
                    status: 'success',
                    message: message || 'Thanh toán thành công!',
                    orderId: orderId,
                    amount: amount ? parseFloat(amount) : null,
                    responseCode: '00',
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
        }
    }, []);

    const formatCurrency = (value) => {
        if (value === null || isNaN(value)) return '';
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
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
                            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>


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
                            <i className="bi bi-x-octagon-fill text-danger" style={{ fontSize: '4rem' }}></i>
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