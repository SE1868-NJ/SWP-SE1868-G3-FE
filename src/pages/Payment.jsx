import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
    const [amount, setAmount] = useState(50000); 
    const [orderId, setOrderId] = useState(123); 
    const [orderDescription, setOrderDescription] = useState(`Thanh toán đơn hàng #${orderId}`); 

    const [bankCode, setBankCode] = useState(''); 
    const [language, setLanguage] = useState('vn'); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setOrderDescription(`Thanh toán đơn hàng #${orderId}`);
    }, [orderId]);

    const handlePayment = async () => {
        setLoading(true);
        setError(null); 

        try {
            const payload = {
                amount: amount,
                orderId: orderId, 
                orderDescription: orderDescription, 
                bankCode: bankCode, 
                language: language, 
            };

            const response = await axios.post('http://localhost:3001/api/payment/create_payment_url', payload);

            if (response.data && response.data.data.paymentUrl) {
                window.location.href = response.data.data.paymentUrl;
            } else {
                setError('Không nhận được URL thanh toán từ server.');
                console.error('Server response missing paymentUrl:', response.data);
            }
        } catch (err) {
            console.error('Lỗi khi gọi API tạo thanh toán:', err);
            let errorMessage = 'Đã xảy ra lỗi trong quá trình tạo yêu cầu thanh toán.';
            if (err.response && err.response.data) {
                if (err.response.data.errors && err.response.data.errors.length > 0) {
                    errorMessage = err.response.data.errors.map(e => e.msg).join('\n');
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
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
                        type="number"
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
                        onChange={(e) => setBankCode(e.target.value.toUpperCase())}
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