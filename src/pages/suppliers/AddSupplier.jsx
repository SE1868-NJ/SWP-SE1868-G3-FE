import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '../../components/Card';

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
        status: 'Active'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Supplier:', supplier);
        navigate('/suppliers');
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='fw-bold'>Add New Supplier</h2>
                <p className="text-muted">Fields marked with <span className="text-danger">*</span> are required.</p>
                <form onSubmit={handleSubmit}>

                    <h5 className="fw-bold">Basic Information</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Supplier Name <span className="text-danger">*</span></label>
                        <input type='text' name='name' className='form-control' onChange={handleChange} required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Delivery Time (Days) <span className="text-danger">*</span></label>
                        <input type='number' name='deliveryTime' className='form-control' onChange={handleChange} required />
                    </div>

                    <h5 className="fw-bold">Transaction Information</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Bank Name</label>
                        <input type='text' name='bankName' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Account Number</label>
                        <input type='text' name='accountNumber' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Payment Term</label>
                        <input type='text' name='paymentTerm' className='form-control' onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold">Supplier Address</h5>
                    <div className='mb-3'>
                        <label className='form-label' >Address <span className="text-danger">*</span></label>
                        <input type='text' name='address' className='form-control' onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold">Contact Information</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Full Name <span className="text-danger">*</span></label>
                        <input type='text' name='contactName' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone Number <span className="text-danger">*</span></label>
                        <input type='text' name='phone' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Facebook</label>
                        <input type='text' name='facebook' className='form-control' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Skype</label>
                        <input type='text' name='skype' className='form-control' onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold">Status</h5>
                    <div className='mb-3'>
                        <select name='status' className='form-select' onChange={handleChange}>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </select>
                    </div>

                    <div className='d-flex gap-2'>
                        <button type='submit' className='btn btn-success'>Save</button>
                        <button type='button' className='btn btn-secondary' onClick={() => navigate('/suppliers')}>Cancel</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

export default AddSupplier;
