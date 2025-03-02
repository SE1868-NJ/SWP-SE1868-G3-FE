import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierList from '../../components/Supplier/SupplierList';
import supplierService from '../../services/supplierService';
import CustomPagination from "../../components/Products/CustomPagination"; // Đoạn tách riêng

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage]);

  const fetchSuppliers = async () => {
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await supplierService.getSuppliers(params);
      if (response && response.items) {
        setSuppliers(response.items);
        setFilteredSuppliers(response.items);
        setTotalPages(response.metadata?.totalPages || 1);
      } else {
        setSuppliers([]);
        setFilteredSuppliers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setSuppliers([]);
      setFilteredSuppliers([]);
      setTotalPages(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const result = suppliers.filter(supplier =>
      supplier.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSuppliers(result);
  };

  return (
    <>
      <SupplierHeader
        title="Quản lý nhà cung cấp"
        subtitle="Quản lý thông tin liên quan đến nhà cung cấp. Chỉ có quyền Quản lý mới có thể truy cập tính năng này."
      />
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='d-flex gap-2 w-auto'>
          <input
            type='search'
            name='search'
            className='form-control'
            placeholder='Nhập tên nhà cung cấp'
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '250px' }}
          />
          <button type='submit' className='btn btn-danger' onClick={handleSearch}>Tìm kiếm</button>
        </div>
        <Link to='/seller/suppliers/add' className='btn btn-danger'>
          + Thêm nhà cung cấp
        </Link>
      </div>
      <SupplierList suppliers={filteredSuppliers} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Suppliers;
