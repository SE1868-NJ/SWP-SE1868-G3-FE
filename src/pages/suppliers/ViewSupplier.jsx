import { useParams, useNavigate } from 'react-router';
import Card from '../../components/Card';

function ViewSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const currentSupplier = storedSuppliers.find(s => s.id.trim() === id.trim());

    const supplier = currentSupplier || null;

    // useEffect(() => {
    //     if (!currentSupplier) {
    //         alert("Supplier not found! Returning to Supplier List.");
    //         navigate('/suppliers'); 
    //     }
    // }, [currentSupplier, navigate]);

    if (!supplier) return null;

    const handleDelete = () => {
        const updatedSuppliers = storedSuppliers.filter(s => s.id !== id);
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
        // alert(`Supplier ${id} has been deleted.`);
        navigate('/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='fw-bold'>Supplier Details</h2>
                <p className="text-muted">Here is the complete information of the supplier.</p>

                <h5 className="fw-bold">Basic Information</h5>
                <p><strong>Supplier Name:</strong> {supplier.name}</p>
                <p><strong>Supplier ID:</strong> {supplier.id}</p>
                <p><strong>Delivery Time:</strong> {supplier.deliveryTime} days</p>

                <h5 className="fw-bold">Transaction Information</h5>
                <p><strong>Bank Name:</strong> {supplier.bankName || 'N/A'}</p>
                <p><strong>Account Number:</strong> {supplier.accountNumber || 'N/A'}</p>
                <p><strong>Payment Term:</strong> {supplier.paymentTerm || 'N/A'}</p>

                <h5 className="fw-bold">Supplier Address</h5>
                <p><strong>Address:</strong> {supplier.address || 'N/A'}</p>

                <h5 className="fw-bold">Contact Information</h5>
                <p><strong>Full Name:</strong> {supplier.contactName || 'N/A'}</p>
                <p><strong>Phone:</strong> {supplier.phone || 'N/A'}</p>
                <p><strong>Facebook:</strong> {supplier.facebook || 'N/A'}</p>
                <p><strong>Skype:</strong> {supplier.skype || 'N/A'}</p>

                <h5 className="fw-bold">Status</h5>
                <p>
                    <span className={`badge ${supplier.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                        {supplier.status}
                    </span>
                </p>

                <h5 className="fw-bold">Additional Notes</h5>
                <p>{supplier.note || 'No additional notes.'}</p>

                <div className='d-flex gap-2 mt-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                    <button className='btn btn-secondary' onClick={() => navigate('/suppliers')}>Back</button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ViewSupplier;
