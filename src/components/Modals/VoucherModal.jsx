import React from "react";

const VoucherModal = ({
  show,
  onClose,
  storeName,
  voucherCode,
  appliedVouchers = [], // Mảng các mã đã áp dụng
  onChangeVoucher,
  onApplyVoucher,
}) => {
  if (!show) return null;

  // Lấy mã voucher hiện tại từ appliedVouchers để hiển thị (nếu có)
  const currentAppliedCode = appliedVouchers.length > 0 ? appliedVouchers[appliedVouchers.length - 1] : "";

  return (
    <div
      style={{
        position: "absolute",
        bottom: "-10px", // Điều chỉnh khoảng cách từ nút
        left: "0",
        transform: "translateY(100%)", // Di chuyển xuống dưới nút
        backgroundColor: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "400px",
        padding: "1.5rem",
        zIndex: 1000 // Đảm bảo hiển thị trên các phần khác
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h5 style={{ fontWeight: "bold", margin: 0 }}>{storeName} Voucher</h5>
        <button
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#000"
          }}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "3rem", color: "#6c757d" }}>
          <i className="bi bi-ticket-perforated"></i>
        </span>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {currentAppliedCode && (
          <p style={{ color: "#28a745", marginBottom: "0.5rem", textAlign: "center" }}>
            Mã đang áp dụng: {currentAppliedCode}
          </p>
        )}
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #dee2e6",
            borderRadius: "0.25rem",
            textAlign: "center",
            fontSize: "1rem"
          }}
          placeholder={currentAppliedCode ? "Nhập mã voucher khác" : "Mã Voucher"}
          value={voucherCode}
          onChange={onChangeVoucher}
        />
      </div>
      <button
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#dc3545",
          border: "none",
          borderRadius: "0.25rem",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer"
        }}
        onClick={onApplyVoucher}
        disabled={!voucherCode.trim()} // Vô hiệu hóa nếu không có mã
      >
        ÁP DỤNG
      </button>
      <p style={{ color: "#6c757d", marginTop: "1rem", lineHeight: "1.5" }}>
        Chưa có mã giảm giá nào của Shop<br />
        Nhập mã giảm giá có sẵn vào thanh bên trên
      </p>
    </div>
  );
};

export default VoucherModal;