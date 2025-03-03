import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VoucherHeader from '../components/Voucher/VoucherHeader';
import VoucherList from '../components/Voucher/VoucherList';

const initialVouchers = [
  {
    id: 1,
    name: "Mừng quốc khánh 2/9",
    startDate: "30/08/2024",
    endDate: "06/09/2024",
    value: 29000,
    valueType: "money",
    quantity: 1000,
    usedQuantity: 0,
    status: "Hết hạn",
    code: "C7096721",
    condition: "Tổng giá trị đơn hàng",
    updatedAt: "10:34 30/08/2024",
    updatedBy: "admin",
  },
  {
    id: 2,
    name: "Chiết khấu cho người dùng hàng thân thiết 1 triệu",
    startDate: "20/08/2024",
    endDate: "20/02/2025",
    value: 5,
    valueType: "percent",
    quantity: 1000,
    usedQuantity: 0,
    status: "Sẵn sàng",
    code: "AECC47E8",
    condition: "Tổng giá trị đơn hàng",
    updatedAt: "13:53 20/08/2024",
    updatedBy: "admin",
  },
];

function Vouchers() {
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm tên/mã voucher
  const [endDate, setEndDate] = useState(""); // Lưu giá trị ngày kết thúc
  const [filteredVouchers, setFilteredVouchers] = useState(initialVouchers);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredVouchers(initialVouchers); // Reset về danh sách gốc khi xóa tìm kiếm
  };

  const handleClearEndDate = () => {
    setEndDate("");
    setFilteredVouchers(initialVouchers); // Reset về danh sách gốc khi xóa ngày
  };

  const handleSearch = () => {
    let result = [...vouchers]; // Sao chép mảng gốc để lọc

    // Lọc theo tên hoặc mã voucher
    if (searchQuery) {
      result = result.filter(voucher =>
        voucher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voucher.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo ngày kết thúc (nếu có)
    if (endDate) {
      result = result.filter(voucher => {
        const voucherEndDate = new Date(voucher.endDate.split('/').reverse().join('-')); // Chuyển đổi định dạng "dd/mm/yyyy" thành "yyyy-mm-dd"
        const selectedEndDate = new Date(endDate);
        return voucherEndDate.toDateString() === selectedEndDate.toDateString(); // So sánh ngày (bỏ qua giờ, phút, giây)
      });
    }

    setFilteredVouchers(result);
  };

  return (
    <>
      <VoucherHeader
        title="Quản lý voucher"
        subtitle="Quản lý thông tin liên quan đến phiếu giảm giá. Chỉ có quyền Quản lý mới có thể truy cập tính năng này."
      />
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='d-flex gap-2 w-auto'>
          <div className='input-group' style={{ width: '250px' }}>
            <input
              type='text'
              name='search'
              className='form-control'
              placeholder='Tên, mã voucher'
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ fontSize: '14px', borderRadius: '4px', border: '1px solid #ced4da' }}
            />
            {searchQuery && (
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={handleClearSearch}
                style={{ fontSize: '14px', padding: '0 8px', borderRadius: '0 4px 4px 0', border: '1px solid #ced4da', borderLeft: 'none' }}
              >
                ×
              </button>
            )}
          </div>
          <div className='input-group' style={{ width: '150px' }}>
            <input
              type='date'
              className='form-control'
              value={endDate}
              onChange={handleEndDateChange}
              style={{ fontSize: '14px', borderRadius: '4px', border: '1px solid #ced4da' }}
            />
            {endDate && (
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={handleClearEndDate}
                style={{ fontSize: '14px', padding: '0 8px', borderRadius: '0 4px 4px 0', border: '1px solid #ced4da', borderLeft: 'none' }}
              >
                ×
              </button>
            )}
          </div>
          <button
            type='submit'
            className='btn btn-danger'
            onClick={handleSearch}
            style={{ fontSize: '14px', padding: '6px 12px', borderRadius: '4px', border: 'none' }}
          >
            Tìm kiếm
          </button>
        </div>
        <Link to='/seller/vouchers/add' className='btn btn-danger'>
          + Thêm mới
        </Link>
      </div>
      <VoucherList vouchers={filteredVouchers} />
    </>
  );
}

export default Vouchers;