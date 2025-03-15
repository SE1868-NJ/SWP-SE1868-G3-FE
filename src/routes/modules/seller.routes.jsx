import OrderManagement from '../../components/Seller/Order/OrderManagement';
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
		path: 'orders',
		element: <OrderManagement />, // Default (new orders)
	},
	{
		path: 'orders/new',
		element: <OrderManagement />, // Explicit new orders
	},
	{
		path: 'orders/processing',
		element: <OrderManagement />, // Processing orders
	},
	{
		path: 'orders/completed',
		element: <OrderManagement />, // Completed orders
	},
	{
		path: 'orders/cancelled',
		element: <OrderManagement />, // Cancelled orders
	}
];
