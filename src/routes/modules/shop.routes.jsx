import ListPage from "../../pages/ListPage";
import Cart from "../../pages/Cart";
import Checkout from "../../pages/Checkout";

export const shopRoutes = [
  {
    path: "/listpage",
    element: <ListPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  }
];