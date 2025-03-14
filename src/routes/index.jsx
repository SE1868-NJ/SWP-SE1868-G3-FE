import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import CartLayout from '../layout/CartLayout/';
import { authRoutes } from './modules/auth.routes';
import { shopRoutes } from './modules/shop.routes';
import { userRoutes } from './modules/user.routes';
import { homeRoute } from './modules/home.routes';
import { orderRoutes } from './modules/order.routes';
import { sellerRoutes } from './modules/seller.routes';
import SellerLayout from '../layout/SellerLayout';
import { supplierRoutes } from './modules/supplier.routes';
import { AuthProvider } from '../hooks/contexts/AuthContext';
import { orderDetailRoutes } from './modules/orderDetail.routes';
import { OrderProvider } from '../hooks/contexts/OrderContext';
import ShopLayout from '../layout/ShopLayout';
import { shopRoute } from './modules/store.routes';
import ProfileLayout from '../layout/ProfileLayout/ProfileLayout';

const routes = [
	{
		path: '/',
		element: (
			<OrderProvider>
				<Layout />
			</OrderProvider>
		),
		children: [...homeRoute, ...authRoutes, ...orderDetailRoutes],
	},
	{
		path: '/',
		element: (
			<OrderProvider>
				<ProfileLayout />
			</OrderProvider>
		), 	
		children: userRoutes,
	},

	{
		path: '/seller',
		element: <SellerLayout />,
		children: [...sellerRoutes, ...supplierRoutes, ...shopRoutes],
	},
	{
		path: '/order',
		element: <CartLayout />,
		children: orderRoutes,
	},
	{
		path: '/shop',
		element: <ShopLayout />,
		children: shopRoute,
	},
];

const router = createBrowserRouter(routes);

function AppRoutes() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default AppRoutes;
