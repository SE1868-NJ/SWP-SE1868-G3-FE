import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../layout/OrderLayout/OrderContext";

const Sidebar = () => {
  const { status, handleStatusChange } = useOrderContext();
  const navigate = useNavigate(); 

  const handleItemClick = (key) => {
    handleStatusChange(key);
    if (key === "order") {
      navigate("/orders"); 
    }
  };

  return (
    <div>
      {/* Hồ sơ */}
      <div className="d-flex align-items-center p-3 border-bottom">
        <div
          className="rounded-circle bg-light me-3"
          style={{ width: 40, height: 40, overflow: "hidden" }}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-100 h-100"
          />
        </div>
        <div>
          <div className="fw-bold">Lê Văn C</div>
          <small className="text-muted">Sửa Hồ Sơ</small>
        </div>
      </div>

      {/* Danh mục */}
      <div className="py-3">
        {[
          { key: "notification", icon: "bi-bell", label: "Thông Báo" },
          { key: "account", icon: "bi-person", label: "Tài Khoản Của Tôi" },
          { key: "order", icon: "bi-file-earmark-text", label: "Đơn Mua" },
          { key: "voucher", icon: "bi-gift", label: "Kho Voucher" },
          { key: "coin", icon: "bi-coin", label: "Shop Xu" },
        ].map((item) => (
          <div
            key={item.key}
            className={`sidebar-item d-flex align-items-center mb-3 ${
              status === item.key ? "text-danger" : ""
            }`}
            onClick={() => handleItemClick(item.key)} 
            style={{
              cursor: "pointer",
              fontWeight: status === item.key ? "bold" : "normal",
              color: status === item.key ? "#dc3545" : "#000",
            }}
          >
            <i className={`bi ${item.icon} fs-5 me-3`}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
