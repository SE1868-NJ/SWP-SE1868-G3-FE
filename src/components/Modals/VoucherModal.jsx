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

      if (windowHeight - modalBottom < footerHeight + 20) {
        modalRef.current.style.bottom = "auto";
        modalRef.current.style.top = "-10px";
        modalRef.current.style.transform = "translateY(-100%)";
      } else {
        modalRef.current.style.bottom = "-10px";
        modalRef.current.style.top = "auto";
        modalRef.current.style.transform = "translateY(100%)";
      }
    }
  }, [show]);

  const totalDiscount = appliedVouchers.reduce((sum, voucher) => sum + (Number(voucher.rate) || 0), 0);

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
        zIndex: 1050,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h5 style={{ fontWeight: "bold", margin: 0 }}>{storeName} Voucher</h5>
        <button
          style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#000" }}
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

      {appliedVouchers.length > 0 && (
        <>
          {appliedVouchers.map((voucher, index) => (
            <div key={index} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: "#28a745", margin: 0 }}>
                Mã đang áp dụng: {voucher.code} (-{(Number(voucher.rate) * 100).toFixed(0)}%)
              </p>
              <button
                style={{ background: "none", border: "none", fontSize: "1rem", cursor: "pointer", color: "#dc3545" }}
                onClick={() => onRemoveVoucher(voucher.code)} // Gửi đúng mã
              >
                Xóa
              </button>
            </div>
          ))}
          {/* {totalDiscount > 1 && (
            <p style={{ color: "#dc3545", marginTop: "0.5rem", textAlign: "center" }}>
              Cảnh báo: Tổng mức giảm giá đã vượt quá 100%. Vui lòng xóa bớt mã để tiếp tục.
            </p>
          )} */}
          <p style={{ color: "#28a745", marginTop: "0.5rem", textAlign: "center" }}>
            Tổng giảm giá: {(totalDiscount * 100).toFixed(0)}%
          </p>
        </>
      )}

      <div style={{ marginTop: "1rem" }}>
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
          disabled={!voucherCode.trim() || totalDiscount >= 1}
        >
          ÁP DỤNG
        </button>
      </div>

      {appliedVouchers.length === 0 && (
        <p style={{ color: "#6c757d", marginTop: "1rem", lineHeight: "1.5" }}>
          Chưa có mã giảm giá nào của Shop<br />
          Nhập mã giảm giá có sẵn vào thanh bên trên
        </p>
      )}
    </div>
  );
};

export default VoucherModal;