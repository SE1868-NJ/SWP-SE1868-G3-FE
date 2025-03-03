import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutProducts from "../components/Checkout/CheckoutProducts";
import CheckoutShipping from "../components/Checkout/CheckoutShipping";
import CheckoutTotal from "../components/Checkout/CheckoutTotal";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";

const Checkout = () => {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [{
    id: 1,
    name: "Máy hút sữa youha gen",
    price: 1650000,
    quantity: 1,
    type: "2 Máy",
    image: "https://via.placeholder.com/50"
  }];

  const [shippingFee, setShippingFee] = useState(20700);
  const [voucherDiscount, setVoucherDiscount] = useState(100000);
  const [note, setNote] = useState("");
  const [insuranceFee, setInsuranceFee] = useState(0);

  const formatCurrency = (amount) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  const totalProductPrice = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = totalProductPrice + shippingFee - voucherDiscount + insuranceFee;

  const handlePlaceOrder = () => {
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="container py-4 bg-light">
      <CheckoutAddress />

      <CheckoutProducts
        selectedProducts={selectedProducts}
        formatCurrency={formatCurrency}
        note={note}
        setNote={setNote}
      />

      <CheckoutShipping
        shippingFee={shippingFee}
        formatCurrency={formatCurrency}
        setShowShippingModal={() => { }}
      />

      <CheckoutPayment
        handlePlaceOrder={handlePlaceOrder}
        totalAmount={totalAmount}
      />

      <CheckoutTotal
        totalProductPrice={totalProductPrice}
        shippingFee={shippingFee}
        voucherDiscount={voucherDiscount}
        insuranceFee={insuranceFee}
        totalAmount={totalAmount}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Checkout;