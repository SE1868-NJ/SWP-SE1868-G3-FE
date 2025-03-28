import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import SupplierHeader from '../../../components/Seller/Supplier/SupplierHeader';
import SupplierList from '../../../components/Seller/Supplier/SupplierList';
import supplierService from '../../../services/SellerServices/supplierService';
import CustomPagination from "../../../components/Pagination/CustomPagination";

const removeAccents = (str) => {
  if (!str) return '';
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
};

const ITEMS_PER_PAGE = 10;
const FETCH_LIMIT = 100;

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedSupplierId, setEditedSupplierId] = useState(null);

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await supplierService.getSuppliers({
        limit: FETCH_LIMIT
      });

      if (response && response.items) {
        const editedId = sessionStorage.getItem('editedSupplierId');
        if (editedId) {
          const editedIdNum = parseInt(editedId, 10);
          setEditedSupplierId(editedIdNum);
          const editedSupplier = response.items.find(s => s.supplier_id === editedIdNum);
          const otherSuppliers = response.items.filter(s => s.supplier_id !== editedIdNum);
          if (editedSupplier) {
            const newSuppliers = [editedSupplier, ...otherSuppliers];
            setSuppliers(newSuppliers);
            setFilteredSuppliers(newSuppliers);
            setTotalPages(Math.max(1, Math.ceil(newSuppliers.length / ITEMS_PER_PAGE)));
          } else {
            setSuppliers(response.items);
            setFilteredSuppliers(response.items);
            setTotalPages(Math.max(1, Math.ceil(response.items.length / ITEMS_PER_PAGE)));
          }
          sessionStorage.removeItem('editedSupplierId');
        } else {
          setSuppliers(response.items);
          setFilteredSuppliers(response.items);
          setTotalPages(Math.max(1, Math.ceil(response.items.length / ITEMS_PER_PAGE)));
        }
        return response.items;
      }
      return [];
    } catch (error) {
      setError("Không thể tải dữ liệu nhà cung cấp. Vui lòng thử lại sau.");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterSuppliers = useCallback((query = searchQuery) => {
    if (!query.trim()) {
      setFilteredSuppliers(suppliers);
      setTotalPages(Math.max(1, Math.ceil(suppliers.length / ITEMS_PER_PAGE)));
      setCurrentPage(1);
      return;
    }
    const normalizedQuery = removeAccents(query.toLowerCase());
    const filtered = suppliers.filter(supplier => {
      const supplierName = supplier.supplier_name || '';
      const supplierCode = supplier.supplier_code || '';
      const normalizedName = removeAccents(supplierName.toLowerCase());
      const normalizedCode = removeAccents(supplierCode.toLowerCase());
      return normalizedName.includes(normalizedQuery) || normalizedCode.includes(normalizedQuery);
    });
    setFilteredSuppliers(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
    setCurrentPage(1);
  }, [suppliers, searchQuery]);
  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);
  useEffect(() => {
    if (suppliers.length > 0) {
      filterSuppliers(searchQuery);
    }
  }, [searchQuery, filterSuppliers]);

  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredSuppliers.slice(startIndex, endIndex);
  }, [filteredSuppliers, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
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
            placeholder='Tìm kiếm nhà cung cấp ...'
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '250px' }}
          />
          {searchQuery && (
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleClearSearch}
            >
              Xóa
            </button>
          )}
        </div>
        <Link to='/seller/suppliers/add' className='btn btn-danger'>
          + Thêm nhà cung cấp
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <SupplierList
            suppliers={paginatedSuppliers}
            editedId={editedSupplierId}
          />

          {filteredSuppliers.length > 0 && totalPages > 1 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}

export default Suppliers;