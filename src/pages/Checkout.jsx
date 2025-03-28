import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutProducts from "../components/Checkout/CheckoutProducts";
import CheckoutTotal from "../components/Checkout/CheckoutTotal";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import { orderService } from "../services/orderService";
import NotificationToast from "../components/Toast/NotificationToast";
import { useAuth } from "../hooks/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Socket } from '../services/socket';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const selectedProducts = location.state?.selectedProducts || [];

  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [shippingMethodId, setShippingMethodId] = useState("nhanh");
  const [shippingFee, setShippingFee] = useState(20700);
  const [voucherId, setVoucherId] = useState(1);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("cod");
  //Status Handle
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const formatCurrency = (amount) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  const totalProductPrice = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = totalProductPrice + shippingFee - voucherDiscount;

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);
      setOrderError(null);

      const dataOrder = {
        user_id: user.id,
        address_id: selectedAddressId,
        items: selectedProducts.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          shop_id: item.shopId,
        })),
        total: totalAmount,
        note: note,
        payment_method: paymentMethodId,
        voucher_id: voucherId || null,
      }

      // const response = await orderService.createOrder(dataOrder);

      Socket.emit('order_placed', dataOrder);
      
      if (paymentMethodId === "cod") {
        navigate(`/orders/pending`);
      } else if (paymentMethodId === "bank") {
        //navigate(`/payment/${response.data.data.id}`);
      }

    } catch (error) {
      console.error("Error creating order:", error);
      setOrderError(
        error.response?.data?.message ||
        "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại."
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
    <div className="container py-4 bg-light">
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