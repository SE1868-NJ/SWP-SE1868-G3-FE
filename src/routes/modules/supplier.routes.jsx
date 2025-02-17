import Suppliers from '../../pages/suppliers/Suppliers';
import AddSupplier from '../../pages/suppliers/AddSupplier';
import EditSupplier from '../../pages/suppliers/EditSupplier';
import ViewSupplier from '../../pages/suppliers/ViewSupplier';

export const supplierRoutes = [
    {
        path: "/suppliers",
        element: <Suppliers />,
    },
    {
        path: "/suppliers/add",
        element: <AddSupplier />,
    },
    {
        path: "/suppliers/edit/:id",
        element: <EditSupplier />,
    },
    {
        path: "/suppliers/view/:id",
        element: <ViewSupplier />,
    },
];