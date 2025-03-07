import ShopPage from "../../pages/Shop";

// modules/store.routes.js
export const shopRoute = [
  {
    path: ":id", // Sử dụng đường dẫn tương đối
    element: <ShopPage />,
  },
];