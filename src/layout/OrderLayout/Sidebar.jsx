import React from "react";

const Sidebar = () => {
  return (
    <div>
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
      <div className="py-3">
        {[
          { icon: "bi-bell", label: "Thông Báo" },
          { icon: "bi-person", label: "Tài Khoản Của Tôi" },
          { icon: "bi-file-earmark-text", label: "Đơn Mua", active: true },
          { icon: "bi-gift", label: "Kho Voucher" },
          { icon: "bi-coin", label: "Shop Xu" },
        ].map((item, index) => (
          <div
            key={index}
            className={`sidebar-item d-flex align-items-center mb-3 ${
              item.active ? "text-danger" : ""
            }`}
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
