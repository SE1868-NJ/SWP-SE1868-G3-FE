import { Navigate } from "react-router-dom";
import OrderLayout from "../../layout/OrderLayout/OrderLayout";
import CompletedOrder from "../../pages/CompletedOrder";
import CancelledOrder from "../../pages/OrderCanceled";
import AllOrders from "../../pages/AllOrders";
import PendingOrder from "../../pages/PendingOrder";

export const orderDetailRoutes = [
  {
    path: "/orders",
    element: <OrderLayout />,
    children: [
      { path: "all", element: <AllOrders /> },
      { path: "pending", element: <PendingOrder /> },
      //{ path: "shipping", element: <ShippingOrder /> },
      //{ path: "delivery", element: <DeliveryOrder /> },
      { path: "completed", element: <CompletedOrder /> },
      { path: "cancelled", element: <CancelledOrder /> },
     // { path: "refund", element: <RefundOrder /> },
      { index: true, element: <Navigate to="completed" replace /> },
    ],
  },
];
