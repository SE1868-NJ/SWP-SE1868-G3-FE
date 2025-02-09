import { useState } from 'react';
import Card from '../../components/Card';
import AddSupplier from './AddSupplier';

function Suppliers() {
    const [showForm, setShowForm] = useState(false);

    const suppliers = [
        { id: 'VNSUP21069449274327216', name: 'Supplier Z (D)', deliveryTime: 3, address: 'Hà Nội', contactInfo: '1 Contact Information', note: '-', status: 'Active' },
        { id: 'VNSUP21068012216352816', name: 'Supplier B', deliveryTime: 10, address: 'Ho Chi Minh', contactInfo: '3 Contact Information', note: '-', status: 'Active' },
        { id: 'VNSUP21061096303083568', name: 'Supplier A', deliveryTime: 10, address: '-', contactInfo: '-', note: '-', status: 'Active' }
    ];

    if (showForm) {
        return <AddSupplier onClose={() => setShowForm(false)} />;
    }

    return (
        <>
            <div className='mb-3'>
                <h2 className='fw-bold'>Supplier Management</h2>
                <p className='text-muted'>Manage supplier-related information. Only Management has access to this feature.</p>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='d-flex gap-2 w-50'>
                    <select className='form-select'>
                        <option>Supplier</option>
                    </select>
                    <input
                        type='search'
                        name='search'
                        className='form-control'
                        placeholder='Search'
                    />
                    <button type='submit' className='btn btn-danger'>
                        Search
                    </button>
                </div>
                <button className='btn btn-danger' onClick={() => setShowForm(true)}>
                    + Add Supplier
                </button>
            </div>
            <Card>
                <Card.Body>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Supplier</th>
                                <th scope='col'>Supplier ID</th>
                                <th scope='col'>Delivery Time (Days)</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Contact Information</th>
                                <th scope='col'>Note</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.id}</td>
                                    <td>{supplier.deliveryTime}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.contactInfo}</td>
                                    <td>{supplier.note}</td>
                                    <td>
                                        <span className={`badge ${supplier.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                                            {supplier.status}
                                        </span>
                                    </td>
                                    <td className='d-flex flex-column'>
                                        <a href='#' className='text-primary'>Edit</a>
                                        <a href='#' className='text-primary'>View More</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </>
    );
}

export default Suppliers;
