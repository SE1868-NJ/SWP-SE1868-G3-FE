import ShopInfoPage from '../../pages/SellerPages/Shop/ShopInfoPage';
import Suppliers from '../../pages/SellerPages/suppliers/Suppliers';
import AddSupplier from '../../pages/SellerPages/suppliers/AddSupplier';
import EditSupplier from '../../pages/SellerPages/suppliers/EditSupplier';
import ViewSupplier from '../../pages/SellerPages/suppliers/ViewSupplier';
import NewOrders from '../../pages/SellerPages/Order/NewOrders';
import ProcessingOrders from '../../pages/SellerPages/Order/ProcessingOrders';
import CompletedOrders from '../../pages/SellerPages/Order/CompletedOrders';
import CancelledOrders from '../../pages/SellerPages/Order/CancelledOrders';

export const sellerRoutes = [
	{
		path: '/seller',
		element: <span>Seller</span>,
	},
	{
		path: 'shop-info',
		element: <ShopInfoPage />,
	},
	{
		path: "/seller/suppliers",
		element: <Suppliers />,
	},
	{
		path: "/seller/suppliers/add",
		element: <AddSupplier />,
	},
	{
		path: "/seller/suppliers/edit/:id",
		element: <EditSupplier />,
	},
	{
		path: "/seller/suppliers/view/:id",
		element: <ViewSupplier />,
	},
	{
		path: 'orders/new',
		element: <NewOrders />,
	},
	{
		path: 'orders/processing',
		element: <ProcessingOrders />,
	},
	{
		path: 'orders/completed',
		element: <CompletedOrders />,
	},
	{
		path: 'orders/cancelled',
		element: <CancelledOrders />,
	}

];
