import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '../../components/Card';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierInfoTable from '../../components/Supplier/SupplierInfoTable';

function AddSupplier() {
    const [supplier, setSupplier] = useState({
        name: '',
        deliveryTime: '',
        bankName: '',
        accountNumber: '',
        paymentTerm: '',
        address: '',
        contactName: '',
        phone: '',
        facebook: '',
        skype: '',
        note: '',
        status: 'Hoạt động'
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
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

        let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
        const newSupplier = { id: Date.now().toString(), ...supplier };
        suppliers.push(newSupplier);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));

        navigate('/seller/suppliers');
    };


    return (
        <Card>
            <Card.Body>
                <SupplierHeader title="Thêm Nhà Cung Cấp" subtitle="Vui lòng điền đầy đủ thông tin." showRequiredNote={true} />
                <form onSubmit={handleSubmit}>
                    <SupplierInfoTable supplier={supplier} handleChange={handleChange} errors={errors} />
                    <div className='d-flex gap-2'>
                        <button type='submit' className='btn btn-success'>Lưu</button>
                        <button type='button' className='btn btn-secondary' onClick={() => navigate('/seller/suppliers')}>Hủy</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

export default AddSupplier;
