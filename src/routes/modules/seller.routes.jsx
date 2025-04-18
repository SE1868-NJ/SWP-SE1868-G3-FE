import ShopInfoPage from '../../pages/SellerPages/Shop/ShopInfoPage';

import Suppliers from '../../pages/SellerPages/Supplier/Suppliers';
import AddSupplier from '../../pages/SellerPages/Supplier/AddSupplier';
import EditSupplier from '../../pages/SellerPages/Supplier/EditSupplier';
import ViewSupplier from '../../pages/SellerPages/Supplier/ViewSupplier';

import NewOrders from '../../pages/SellerPages/Order/NewOrders';
import ProcessingOrders from '../../pages/SellerPages/Order/ProcessingOrders';
import CompletedOrders from '../../pages/SellerPages/Order/CompletedOrders';
import CancelledOrders from '../../pages/SellerPages/Order/CancelledOrders';

import DashboardPage from '../../pages/SellerPages/DashboardPage';

import OrdersInDelivery from '../../pages/SellerPages/Order/OrdersInDelivery';

import ShopChat from '../../pages/SellerPages/CustomerService/ShopChat';
import ShopRating from '../../pages/SellerPages/CustomerService/ShopRating';
import ManagementEmail from '../../pages/SellerPages/CustomerService/ManagementEmail';
import SellerAllProducts from '../../pages/SellerPages/SellerAllProducts';
import EmailTemplateManagement from '../../pages/SellerPages/CustomerService/EmailTemplateManagement';

export const sellerRoutes = [
	{
		path: '/seller',
		element: <DashboardPage />,
	},
	{
		path: 'shop-info',
		element: <ShopInfoPage />,
	},
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
	},
	{
		path: 'orders/ship',
		element: <OrdersInDelivery />,
	},
	{
		path: '/seller/chat',
		element: <ShopChat />,
	},
	{
		path: '/seller/ratting/:shop_id',
		element: <ShopRating />,
	},
	{
		path:'/seller/management-email',
		element: <ManagementEmail />,
	},
	{
		path: '/seller/products/:shop_id',
		element: <SellerAllProducts />,
	},
	{
		path: '/seller/email-template-manager',
		element: <EmailTemplateManagement />,
	}

];
