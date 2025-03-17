import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierList from '../../components/Supplier/SupplierList';
import supplierService from '../../services/supplierService';
import CustomPagination from "../../components/Products/CustomPagination";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage]);

  const fetchSuppliers = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      const response = await supplierService.getSuppliers(params);
      if (response && response.items) {
        // Kiểm tra xem có nhà cung cấp vừa sửa không
        const editedId = sessionStorage.getItem('editedSupplierId');

        if (editedId) {
          // Chuyển editedId từ string thành số
          const editedIdNum = parseInt(editedId, 10);

          // Lọc nhà cung cấp vừa sửa
          const editedSupplier = response.items.find(s => s.supplier_id === editedIdNum);

          // Lọc các nhà cung cấp còn lại
          const otherSuppliers = response.items.filter(s => s.supplier_id !== editedIdNum);

          // Nếu tìm thấy nhà cung cấp vừa sửa, đưa lên đầu danh sách
          if (editedSupplier) {
            const newSuppliers = [editedSupplier, ...otherSuppliers];
            setSuppliers(newSuppliers);
            setFilteredSuppliers(newSuppliers);
          } else {
            setSuppliers(response.items);
            setFilteredSuppliers(response.items);
          }

          // Xóa editedId khỏi sessionStorage sau khi đã sử dụng
          sessionStorage.removeItem('editedSupplierId');
        } else {
          setSuppliers(response.items);
          setFilteredSuppliers(response.items);
        }

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
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredSuppliers(suppliers);
      return;
    }

    const result = suppliers.filter(supplier =>
      supplier.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (supplier.supplier_code && supplier.supplier_code.toLowerCase().includes(searchQuery.toLowerCase()))
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
            placeholder='Nhập tên hoặc mã ...'
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
      <SupplierList
        suppliers={filteredSuppliers}
        editedId={parseInt(sessionStorage.getItem('editedSupplierId') || '0', 10)}
      />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Suppliers;