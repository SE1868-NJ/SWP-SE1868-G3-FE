import ListPage from "../../pages/ListPage";
import Cart from "../../pages/Cart";
import Checkout from "../../pages/Checkout";
import ShopChat from "../../pages/ShopChat";
import Products from "../../pages/Products";

export const shopRoutes = [
  {
    path: "/list_page",
    element: <ListPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/shop/chat",
    element: <ShopChat />,
  },
  {
    path: "/shop/product",
    element: <Products />,
  }
];