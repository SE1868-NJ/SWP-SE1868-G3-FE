import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VoucherHeader from '../components/Voucher/VoucherHeader';
import VoucherList from '../components/Voucher/VoucherList';
import VoucherForm from '../components/Modals/VoucherForm';

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
    name: "Chiết khấu cho những đơn hàng trên 1 triệu",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVouchers, setFilteredVouchers] = useState(initialVouchers);
  const [showForm, setShowForm] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredVouchers(vouchers);
      return;
    }

    const result = vouchers.filter(voucher =>
      voucher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voucher.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredVouchers(result);
  };

  const handleAddNewVoucher = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleVoucherSubmit = (newVoucherData) => {
    // Format data and add new voucher
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes} ${day}/${month}/${year}`;

    // Create the new voucher
    const newVoucher = {
      id: vouchers.length > 0 ? Math.max(...vouchers.map(v => v.id)) + 1 : 1,
      name: newVoucherData.name,
      startDate: newVoucherData.startDate,
      endDate: newVoucherData.endDate,
      value: parseFloat(newVoucherData.value),
      valueType: newVoucherData.valueType,
      quantity: parseInt(newVoucherData.quantity, 10),
      usedQuantity: 0,
      status: "Sẵn sàng",
      code: newVoucherData.code,
      condition: newVoucherData.serviceLimit === 'total' ? "Tổng giá trị đơn hàng" :
        newVoucherData.serviceLimit === 'allServices' ? "Tất cả thể dịch vụ" :
          newVoucherData.serviceLimit === 'allProducts' ? "Tất cả sản phẩm" : "Tùy chọn",
      updatedAt: formattedTime,
      updatedBy: "admin",
    };

    // Add the new voucher to the list
    const updatedVouchers = [...vouchers, newVoucher];
    setVouchers(updatedVouchers);
    setFilteredVouchers(updatedVouchers);

    // Close the form and show success message
    setShowForm(false);

    // Instead of using toast.success, you can implement a simple notification system
    // or just use an alert for now until you install react-toastify
    alert("Thêm mới voucher thành công!");
  };

  return (
    <div className="container-fluid p-4">
      <VoucherHeader
        title="Quản lý voucher"
        subtitle="Quản lý thông tin liên quan đến phiếu giảm giá. Chỉ có quyền Quản lý mới có thể truy cập tính năng này."
      />

      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='d-flex gap-2 w-auto'>
          <input
            type='search'
            name='search'
            className='form-control'
            placeholder='Nhập tên hoặc mã voucher'
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '250px' }}
          />

          <button
            type='submit'
            className='btn btn-sm text-white'
            style={{ backgroundColor: '#f56e6e', fontSize: '13px', height: '34px' }}
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>

        <button
          className='btn btn-sm text-white'
          style={{ backgroundColor: '#f56e6e', fontSize: '13px', height: '34px' }}
          onClick={handleAddNewVoucher}
        >
          + Thêm mới
        </button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <VoucherList vouchers={filteredVouchers} />
        </div>
      </div>

      {/* Render the VoucherForm component when showForm is true */}
      {showForm && (
        <VoucherForm
          onClose={handleCloseForm}
          onSubmit={handleVoucherSubmit}
        />
      )}
    </div>
  );
}

export default Vouchers;