// PaymentPage.js (Frontend - React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
    // --- Dữ liệu đơn hàng (Trong thực tế sẽ lấy từ props, context hoặc state khác) ---
    const [amount, setAmount] = useState(50000); // Ví dụ: 50,000 VND
    const [orderId, setOrderId] = useState(123); // Ví dụ: ID đơn hàng từ DB (Backend yêu cầu kiểu số)
    const [orderDescription, setOrderDescription] = useState(`Thanh toán đơn hàng #${orderId}`); // Mô tả đơn hàng
    // -----------------------------------------------------------------------------

    const [bankCode, setBankCode] = useState(''); // Để trống nếu muốn chọn ở cổng VNPay, hoặc set mã ngân hàng nếu chọn trước (VD: 'VNBANK', 'NCB', 'VISA'...)
    const [language, setLanguage] = useState('vn'); // Ngôn ngữ cổng thanh toán ('vn' hoặc 'en')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cập nhật mô tả khi orderId thay đổi (ví dụ)
    useEffect(() => {
        setOrderDescription(`Thanh toán đơn hàng #${orderId}`);
    }, [orderId]);

    const handlePayment = async () => {
        setLoading(true);
        setError(null); // Xóa lỗi cũ

        try {
            // Dữ liệu gửi lên backend
            const payload = {
                amount: amount,
                orderId: orderId, // ID đơn hàng của bạn
                orderDescription: orderDescription, // Mô tả gửi cho VNPay
                bankCode: bankCode, // Mã ngân hàng (nếu có)
                language: language, // Ngôn ngữ
            };

            console.log('Sending payment request:', payload);

            // Gọi API backend để tạo URL thanh toán VNPay
            // *** Đảm bảo backend đang chạy ở port 3001 ***
            const response = await axios.post('http://localhost:3001/api/payment/create_payment_url', payload);

            console.log('Backend response:', response.data.data.paymentUrl);

            // Kiểm tra xem backend có trả về paymentUrl không
            if (response.data && response.data.data.paymentUrl) {
                // Chuyển hướng người dùng đến cổng thanh toán VNPay
                window.location.href = response.data.data.paymentUrl;
            } else {
                setError('Không nhận được URL thanh toán từ server.');
                console.error('Server response missing paymentUrl:', response.data);
            }
        } catch (err) {
            console.error('Lỗi khi gọi API tạo thanh toán:', err);
            let errorMessage = 'Đã xảy ra lỗi trong quá trình tạo yêu cầu thanh toán.';
            if (err.response && err.response.data) {
                // Hiển thị lỗi cụ thể từ backend nếu có
                if (err.response.data.errors && err.response.data.errors.length > 0) {
                    errorMessage = err.response.data.errors.map(e => e.msg).join('\n');
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false); // Kết thúc loading dù thành công hay thất bại
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Trang Thanh Toán VNPay</h2>
            <div>
                <label>
                    Số tiền (VND):
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        disabled={loading}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    ID Đơn hàng:
                    <input
                        type="number" // Backend yêu cầu kiểu số cho orderId
                        value={orderId}
                        onChange={(e) => setOrderId(Number(e.target.value))}
                        disabled={loading}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Mô tả đơn hàng:
                    <input
                        type="text"
                        value={orderDescription}
                        onChange={(e) => setOrderDescription(e.target.value)}
                        disabled={loading}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Mã Ngân hàng (để trống để chọn tại VNPay):
                    <input
                        type="text"
                        placeholder="VD: VNBANK, NCB, VISA,..."
                        value={bankCode}
                        onChange={(e) => setBankCode(e.target.value.toUpperCase())} // Mã thường viết hoa
                        disabled={loading}
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </label>
            </div>
             <div>
                <label>
                    Ngôn ngữ:
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={loading}
                        style={{ width: '100%', marginBottom: '20px', padding: '8px' }}
                    >
                        <option value="vn">Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </label>
            </div>

            {error && (
                <div style={{ color: 'red', marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
                    <strong>Lỗi:</strong> {error}
                </div>
            )}

            <button
                onClick={handlePayment}
                disabled={loading} // Vô hiệu hóa nút khi đang xử lý
                style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                {loading ? 'Đang xử lý...' : 'Thanh toán qua VNPay'}
            </button>
        </div>
    );
};

export default PaymentPage;