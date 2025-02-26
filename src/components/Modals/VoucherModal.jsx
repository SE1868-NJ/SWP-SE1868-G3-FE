import React, { useEffect, useRef } from "react";

const VoucherModal = ({
  show,
  onClose,
  storeName,
  voucherCode,
  appliedVouchers = [],
  onChangeVoucher,
  onApplyVoucher,
  onRemoveVoucher,
}) => {
  if (!show) return null;

  const modalRef = useRef(null);
  const footerHeight = 60;

  useEffect(() => {
    if (modalRef.current) {
      const modalRect = modalRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const modalBottom = modalRect.bottom;

      // Nếu modal gần hoặc bị che bởi footer, đẩy nó lên trên nút
      if (windowHeight - modalBottom < footerHeight + 20) { // 20 là khoảng cách an toàn
        modalRef.current.style.bottom = "auto"; // Xóa bottom
        modalRef.current.style.top = "-10px"; // Hiển thị lên trên nút
        modalRef.current.style.transform = "translateY(-100%)"; // Di chuyển lên trên
      } else {
        modalRef.current.style.bottom = "-10px"; // Hiển thị xuống dưới nút
        modalRef.current.style.top = "auto"; // Xóa top
        modalRef.current.style.transform = "translateY(100%)"; // Di chuyển xuống dưới
      }
    }
  }, [show]);

  // Tổng mức giảm giá hiện tại
  const totalDiscount = appliedVouchers.reduce((sum, voucher) => sum + voucher.rate, 0);

  return (
    <div
      ref={modalRef}
      style={{
        position: "absolute",
        left: "0",
        backgroundColor: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "400px",
        padding: "1.5rem",
        zIndex: 1050, // Tăng zIndex để đè lên footer
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

      {/* Hiển thị danh sách các mã đã áp dụng */}
      {appliedVouchers.map((voucher, index) => (
        <div key={index} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#28a745", margin: 0 }}>
            Mã đang áp dụng: {voucher.code} (-{(voucher.rate * 100).toFixed(0)}%)
          </p>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1rem",
              cursor: "pointer",
              color: "#dc3545"
            }}
            onClick={() => onRemoveVoucher(voucher.code)}
          >
            Xóa
          </button>
        </div>
      ))}

      {/* Hiển thị tổng giảm giá (tùy chọn) */}
      {appliedVouchers.length > 0 && (
        <p style={{ color: "#28a745", marginTop: "0.5rem", textAlign: "center" }}>
          Tổng giảm giá: {(totalDiscount * 100).toFixed(0)}%
        </p>
      )}

      {/* Hiển thị input nếu tổng giảm giá chưa đạt 100% */}
      {totalDiscount < 1 && (
        <div style={{ marginBottom: "1rem" }}>
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
            placeholder="Nhập mã Voucher"
            value={voucherCode}
            onChange={onChangeVoucher}
          />
        </div>
      )}

      {/* Nút ÁP DỤNG nếu có mã và tổng giảm giá chưa đạt 100% */}
      {totalDiscount < 1 && voucherCode.trim() && (
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
        >
          ÁP DỤNG
        </button>
      )}

      {/* Hiển thị thông báo nếu chưa có mã và tổng giảm giá chưa đạt 100% */}
      {totalDiscount < 1 && !voucherCode && (
        <p style={{ color: "#6c757d", marginTop: "1rem", lineHeight: "1.5" }}>
          Chưa có mã giảm giá nào của Shop<br />
          Nhập mã giảm giá có sẵn vào thanh bên trên
        </p>
      )}

      {/* Hiển thị thông báo nếu đã đạt mức giảm giá tối đa */}
      {totalDiscount >= 1 && (
        <p style={{ color: "#6c757d", marginTop: "1rem", lineHeight: "1.5" }}>
          Đã đạt mức giảm giá tối đa (100%)!
        </p>
      )}
    </div>
  );
};

export default VoucherModal;