import Cart from '../../pages/Cart';
import Checkout from '../../pages/Checkout';

export const orderRoutes = [
  {
    path: "order/cart",
    Component: Cart
  },
  {
    path: "order/checkout",
    Component: Checkout
  }
];