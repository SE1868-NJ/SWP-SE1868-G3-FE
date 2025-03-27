import Cart from '../../pages/Cart';
import Checkout from '../../pages/Checkout';
import PaymentPage from '../../pages/Payment';

export const orderRoutes = [
  {
    path: "cart",
    element: <Cart />
  },
  {
    path: "checkout",
    element: <Checkout />
  },
  {
    path: "payment/momo",
    element: <PaymentPage />
  },
];
