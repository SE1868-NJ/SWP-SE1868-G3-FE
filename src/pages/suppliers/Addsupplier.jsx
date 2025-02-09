import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card';

function AddSupplier({ onClose }) {
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Supplier:', supplier);
        onClose();
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
                        <input type='text' name='name' className='form-control' value={supplier.name} onChange={handleChange} required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Delivery Time (Days) <span className="text-danger">*</span></label>
                        <input type='number' name='deliveryTime' className='form-control' value={supplier.deliveryTime} onChange={handleChange} required />
                    </div>

                    <h5 className="fw-bold">Transaction Information</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Bank Name</label>
                        <input type='text' name='bankName' className='form-control' value={supplier.bankName} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Account Number</label>
                        <input type='text' name='accountNumber' className='form-control' value={supplier.accountNumber} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Payment Term</label>
                        <input type='text' name='paymentTerm' className='form-control' value={supplier.paymentTerm} onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold">Supplier Address</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Address</label>
                        <input type='text' name='address' className='form-control' value={supplier.address} onChange={handleChange} />
                    </div>

                    <h5 className="fw-bold">Contact Information</h5>
                    <div className='mb-3'>
                        <label className='form-label'>Full Name</label>
                        <input type='text' name='contactName' className='form-control' value={supplier.contactName} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone Number</label>
                        <input type='text' name='phone' className='form-control' value={supplier.phone} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Facebook</label>
                        <input type='text' name='facebook' className='form-control' value={supplier.facebook} onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Skype</label>
                        <input type='text' name='skype' className='form-control' value={supplier.skype} onChange={handleChange} />
                    </div>

                    <div className='d-flex gap-2'>
                        <button type='submit' className='btn btn-success'>Save</button>
                        <button type='button' className='btn btn-secondary' onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

AddSupplier.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddSupplier;
