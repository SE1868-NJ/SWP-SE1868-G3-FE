import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierInfoTable from '../../components/Supplier/SupplierInfoTable';

function EditSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const currentSupplier = storedSuppliers.find(s => s.id.trim() === id.trim());

    const [supplier, setSupplier] = useState(currentSupplier || null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!currentSupplier) {
            alert("Không tìm thấy nhà cung cấp! Quay lại danh sách.");
            navigate('/suppliers');
        }
    }, [currentSupplier, navigate]);

    if (!supplier) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!supplier.name.trim()) newErrors.name = "Tên nhà cung cấp không được để trống";
        if (!supplier.deliveryTime || supplier.deliveryTime <= 0) newErrors.deliveryTime = "Thời gian giao hàng phải lớn hơn 0";
        if (!supplier.address.trim()) newErrors.address = "Địa chỉ không được để trống";
        if (!supplier.contactName.trim()) newErrors.contactName = "Họ và tên không được để trống";
        if (!supplier.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
        else if (!/^\d{10,11}$/.test(supplier.phone)) newErrors.phone = "Số điện thoại không hợp lệ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const updatedSuppliers = storedSuppliers.map(s => (s.id === supplier.id ? supplier : s));
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));

        console.log('Cập nhật nhà cung cấp:', supplier);
        navigate('/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <SupplierHeader title="Chỉnh sửa Nhà Cung Cấp" subtitle="Vui lòng điền đầy đủ thông tin." showRequiredNote={true} />
                <form onSubmit={handleSubmit}>
                    <SupplierInfoTable supplier={supplier} handleChange={handleChange} errors={errors} />
                    <div className='d-flex gap-2'>
                        <button type='submit' className='btn btn-success'>Lưu</button>
                        <button type='button' className='btn btn-secondary' onClick={() => navigate('/suppliers')}>Hủy</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

export default EditSupplier;
