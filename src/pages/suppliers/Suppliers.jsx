import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierList from '../../components/Supplier/SupplierList';
import supplierService from '../../services/supplierService';

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await supplierService.getAllSupplier();
        setSuppliers(data);
        setFilteredSuppliers(data);
      } catch (error) {
      }
    };
    fetchSuppliers();
  }, []);

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
    </>
  );
}

export default Suppliers;
