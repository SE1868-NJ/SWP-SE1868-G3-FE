// import { Navigate } from 'react-router-dom';
import ShopInfoPage from '../../pages/SellerPages/Shop/ShopInfoPage';
import NewOrders from '../../pages/SellerPages/Order/NewOrders';
import ProcessingOrders from '../../pages/SellerPages/Order/ProcessingOrders';
import CompletedOrders from '../../pages/SellerPages/Order/CompletedOrders';
import CancelledOrders from '../../pages/SellerPages/Order/CancelledOrders';

export const sellerRoutes = [
	{
		path: '/seller',
		element: <span>Seller</span>,
	},
	// {
	// 	path: '/login',
	// 	// element: <SellerLogin />,
	// },
	{
		path: '/seller/shop-info',
		element: <ShopInfoPage />,
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
