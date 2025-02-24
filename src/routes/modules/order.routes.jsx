import Cart from '../../pages/Cart';
import Checkout from '../../pages/Checkout';

export const orderRoutes = [
  {
    path: "cart",
    element: <Cart />
  },
  {
    path: "checkout",
    element: <Checkout />
  }
];
