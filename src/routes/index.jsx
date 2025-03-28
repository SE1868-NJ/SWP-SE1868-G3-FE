import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import CartLayout from '../layout/CartLayout/';
import SellerLayout from '../layout/SellerLayout';
import ShopLayout from '../layout/ShopLayout';
import ProfileLayout from '../layout/ProfileLayout/ProfileLayout';

import { authRoutes } from './modules/auth.routes';
import { shopRoute } from './modules/shop.routes';
import { userRoutes } from './modules/user.routes';
import { homeRoute } from './modules/home.routes';
import { orderRoutes } from './modules/order.routes';
import { sellerRoutes } from './modules/seller.routes';
import { orderDetailRoutes } from './modules/orderDetail.routes';

import { OrderProvider } from '../hooks/contexts/OrderContext';
import { AuthProvider } from '../hooks/contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const wrapProtectedRoutes = (routes) => {
	return routes.map(route => ({
		...route,
		element: <ProtectedRoute>{route.element}</ProtectedRoute>
	}));
};

const protectedUserRoutes = wrapProtectedRoutes(userRoutes);
const protectedSellerRoutes = wrapProtectedRoutes(sellerRoutes);
const protectedOrderRoutes = wrapProtectedRoutes(orderRoutes);
const protectedOrderDetailRoutes = wrapProtectedRoutes(orderDetailRoutes);

const routes = [
	{
		path: '/',
		element: (
			<OrderProvider>
				<Layout />
			</OrderProvider>
		),
		children: [...homeRoute, ...authRoutes, ...protectedOrderDetailRoutes],
	},
	{
		path: '/',
		element: (
			<OrderProvider>
				<ProfileLayout />
			</OrderProvider>
		),
		children: protectedUserRoutes,
	},
	{
		path: '/seller',
		element: <SellerLayout />,
		children: protectedSellerRoutes,
	},
	{
		path: '/order',
		element: <CartLayout />,
		children: protectedOrderRoutes,
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