import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import SupplierHeader from '../../components/Supplier/SupplierHeader';
import SupplierInfoTable from '../../components/Supplier/SupplierInfoTable';
import supplierService from '../../services/supplierService';

function ViewSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await supplierService.getSupplierById(id);
        setSupplier(response);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhà cung cấp:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này không?");
    if (!isConfirmed) return;

    try {
      setDeleting(true);
      await supplierService.deleteSupplier(id);
      alert("Xóa thành công!");
      navigate('/seller/suppliers');
    } catch (error) {
      console.error("Lỗi khi xóa nhà cung cấp:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Đang tải...</h2>;
  }

  if (!supplier) {
    return <h2 className="text-center mt-5">Nhà cung cấp không tồn tại!</h2>;
  }

  return (
    <Card>
      <Card.Body>
        <SupplierHeader title="Chi tiết Nhà Cung Cấp" subtitle="Dưới đây là thông tin chi tiết của nhà cung cấp." />
        <SupplierInfoTable supplier={supplier} readOnly={true} />
        <div className='d-flex gap-2 mt-3'>
          <button className='btn btn-danger' onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Đang xóa...' : 'Xóa'}
          </button>
          <button className='btn btn-secondary' onClick={() => navigate('/seller/suppliers')}>Quay lại</button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ViewSupplier;
