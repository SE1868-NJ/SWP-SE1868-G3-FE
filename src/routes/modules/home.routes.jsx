import { element } from 'prop-types';
import Cart from '../../pages/Cart';
import Checkout from '../../pages/Checkout';
import CompletedOrder from '../../pages/CompletedOrder';
import Home from '../../pages/Home';
import ListPage from '../../pages/ListPage';
import ProductDetails from '../../pages/ProductDetails';
import SearchProduct from '../../pages/SearchProduct';
import PaymentPage from '../../pages/Payment';
import PaymentResultPage from '../../pages/PaymentResultPage';

export const homeRoute = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/list_page',
		element: <ListPage />,
	},
	{
		path: '/cart',
		element: <Cart />,
	},
	{
		path: '/checkout',
		element: <Checkout />,
	},
	{
		path: '/product/:id',
		element: <ProductDetails />,
	},
	{
		path: '/search',
		element: <SearchProduct />,
	},
	{
		path: '/checkout/payment',
		element: <PaymentPage />,
	},
	{
		path: "payment-result",
		element: <PaymentResultPage/>
	  }
];
