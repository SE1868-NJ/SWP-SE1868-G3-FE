import React from "react";
import ShopChat from "../../pages/ShopChat";
import ShopRating from "../../pages/SellerPages/ShopRating/ShopRating";
export const shopRoutes = [
  {
    path: "/seller/chat",
    element: <ShopChat />,
  },
  { path: '/seller/ratting/:shopId', element: <ShopRating /> },

];