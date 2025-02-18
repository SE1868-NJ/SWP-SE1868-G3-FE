import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierList from '../../components/Supplier/SupplierList';

function Suppliers() {
    const initialSuppliers = [
        { id: '1', name: 'Nhà cung cấp Z (D)', deliveryTime: 3, address: 'Hà Nội', contactInfo: '1 Thông tin liên hệ', note: '-', status: 'Hoạt động' },
        { id: '2', name: 'Nhà cung cấp B', deliveryTime: 10, address: 'Hồ Chí Minh', contactInfo: '3 Thông tin liên hệ', note: '-', status: 'Hoạt động' },
        { id: '3', name: 'Nhà cung cấp A', deliveryTime: 10, address: '-', contactInfo: '-', note: '-', status: 'Ngừng Hoạt động' }
    ];

    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

    useEffect(() => {
        const storedSuppliers = JSON.parse(localStorage.getItem('suppliers'));
        if (!storedSuppliers || storedSuppliers.length === 0) {
            localStorage.setItem('suppliers', JSON.stringify(initialSuppliers));
            setSuppliers(initialSuppliers);
            setFilteredSuppliers(initialSuppliers);
        } else {
            setSuppliers(storedSuppliers);
            setFilteredSuppliers(storedSuppliers);
        }
    }, []);

    // Nhập 
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Tìm kiếm
    const handleSearch = () => {
        const result = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Link to='/suppliers/add' className='btn btn-danger'>
                    + Thêm nhà cung cấp
                </Link>
            </div>
            <SupplierList suppliers={filteredSuppliers} />
        </>
    );
}

export default Suppliers;
