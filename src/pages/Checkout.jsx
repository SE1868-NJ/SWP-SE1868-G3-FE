import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutAddress from '../components/Checkout/CheckoutAddress';
import CheckoutPayment from '../components/Checkout/CheckoutPayment';
import CheckoutProducts from '../components/Checkout/CheckoutProducts';
import CheckoutTotal from '../components/Checkout/CheckoutTotal';
import NotificationToast from '../components/Toast/NotificationToast';
import { useAuth } from '../hooks/contexts/AuthContext';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';

const Checkout = () => {
	const location = useLocation();
	const { user } = useAuth();
	const navigate = useNavigate();

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastVariant, setToastVariant] = useState('success');

	const selectedProducts = location.state?.selectedProducts || [];

	const [selectedAddressId, setSelectedAddressId] = useState('1');
	const [shippingMethodId, setShippingMethodId] = useState('nhanh');
	const [shippingFee, setShippingFee] = useState(0);
	const [voucherId, setVoucherId] = useState(1);
	const [voucherDiscount, setVoucherDiscount] = useState(0);
	const [note, setNote] = useState('');
	const [paymentMethodId, setPaymentMethodId] = useState('cod');
	//Status Handle
	const [isProcessing, setIsProcessing] = useState(false);
	const [orderError, setOrderError] = useState(null);

	const formatCurrency = (amount) =>
		new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(amount);

	const totalProductPrice = selectedProducts.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const totalAmount = totalProductPrice + shippingFee - voucherDiscount;

	const generateOrderId = () => {
		const timestamp = Date.now();
		return timestamp;
	};

	const handlePlaceOrder = async () => {
		try {
			setIsProcessing(true);
			setOrderError(null);
			const order_id = generateOrderId();

			const dataOrder = {
				order_id: order_id,
				user_id: user.id,
				address_id: selectedAddressId,
				items: selectedProducts.map((item) => ({
					product_id: item.productId,
					quantity: item.quantity,
					price: item.price,
					shop_id: item.shopId,
				})),
				total: totalAmount,
				note: note,
				payment_method: paymentMethodId,
				voucher_id: voucherId || null,
				status: 'pending',
			};

			const payload = {
				amount: totalAmount,
				orderId: order_id,
				orderDescription: '',
				bankCode: '',
				language: 'en',
			};
			const res = await orderService.createOrder(dataOrder);

			//Socket.emit('order_placed', dataOrder);
			// console.log('paymentMethodId:', payload);

			if (paymentMethodId === 'cod') {
				navigate(`/orders/pending`);
			} else if (paymentMethodId === 'bank') {
				const response = await paymentService.getUrlVNPay(payload);
				console.log('response:', response);
				if (response && response.paymentUrl) {
					window.location.href = response.paymentUrl;
				} else {
					setError('Không nhận được URL thanh toán từ server.');
					console.error('Server response missing paymentUrl:', response.data);
				}
			}
		} catch (error) {
			console.error('Error creating order:', error);
			setOrderError(
				error.response?.data?.message ||
					'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.',
			);
		} finally {
			setIsProcessing(false);
		}
	};

	const handleAddressChange = (addressId) => {
		setSelectedAddressId(addressId);
	};

	// const handleShippingChange = (methodId, fee) => {
	//   setShippingMethodId(methodId);
	//   setShippingFee(fee);
	// };

	const handlePaymentChange = (methodId) => {
		setPaymentMethodId(methodId);
	};

	return (
		<div className='container py-4 bg-light'>
			<CheckoutAddress
				selectedAddressId={selectedAddressId}
				onSelectAddress={handleAddressChange}
			/>

			<CheckoutProducts
				products={selectedProducts}
				formatCurrency={formatCurrency}
				note={note}
				setNote={setNote}
			/>

			{/* <CheckoutShipping
        shippingFee={shippingFee}
        formatCurrency={formatCurrency}
        setShowShippingModal={() => { }}
      /> */}

			<CheckoutPayment
				selectedMethodId={paymentMethodId}
				onPaymentChange={handlePaymentChange}
			/>

			<CheckoutTotal
				totalProductPrice={totalProductPrice}
				shippingFee={shippingFee}
				totalAmount={totalAmount}
				formatCurrency={formatCurrency}
				handlePlaceOrder={handlePlaceOrder}
				isProcessing={isProcessing}
			/>

			<NotificationToast
				show={showToast}
				message={toastMessage}
				variant={toastVariant}
				onClose={() => setShowToast(false)}
			/>
		</div>
	);
};

export default Checkout;
