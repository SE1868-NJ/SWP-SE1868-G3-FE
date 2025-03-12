import React from "react";
import Sidebar from "./Sidebar";
import OrderTabs from "./OrderTabs";
import { Outlet } from "react-router-dom";

const OrderLayout = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2" style={{ minHeight: "100vh" }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 bg-light">
          <OrderTabs />
          <div className="container">
            <Outlet /> {/* Render nội dung theo route con */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
