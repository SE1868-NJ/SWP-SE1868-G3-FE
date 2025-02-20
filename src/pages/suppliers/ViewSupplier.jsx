import { useParams, useNavigate } from 'react-router';
import Card from '../../components/Card';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierInfoTable from '../../components/Supplier/SupplierInfoTable';

function ViewSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const currentSupplier = storedSuppliers.find(s => s.id.trim() === id.trim());

    const supplier = currentSupplier || null;

    if (!supplier) return null;

    const handleDelete = () => {
        const updatedSuppliers = storedSuppliers.filter(s => s.id !== id);
        localStorage.setItem('/seller/suppliers', JSON.stringify(updatedSuppliers));
        navigate('/seller/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <SupplierHeader title="Chi tiết Nhà Cung Cấp" subtitle="Dưới đây là thông tin chi tiết của nhà cung cấp." />
                <SupplierInfoTable supplier={supplier} readOnly={true} />
                <div className='d-flex gap-2 mt-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>Xóa</button>
                    <button className='btn btn-secondary' onClick={() => navigate('/suppliers')}>Quay lại</button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ViewSupplier;
