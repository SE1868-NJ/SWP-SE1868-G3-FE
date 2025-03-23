import Suppliers from '../../pages/suppliers/Suppliers';
import AddSupplier from '../../pages/suppliers/AddSupplier';
import EditSupplier from '../../pages/suppliers/EditSupplier';
import ViewSupplier from '../../pages/suppliers/ViewSupplier';
import SellerAllProducts from '../../pages/SellerAllProducts';
import { element } from 'prop-types';

export const supplierRoutes = [
	{
		path: '/seller/suppliers',
		element: <Suppliers />,
	},
	{
		path: '/seller/suppliers/add',
		element: <AddSupplier />,
	},
	{
		path: '/seller/suppliers/edit/:id',
		element: <EditSupplier />,
	},
	{
		path: '/seller/suppliers/view/:id',
		element: <ViewSupplier />,
	},
	{
		path: '/seller/products/:shopId',
		element: <SellerAllProducts />,
	},
];
