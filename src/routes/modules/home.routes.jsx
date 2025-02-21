import Home from '../../pages/Home';
import ListPage from '../../pages/ListPage';
import Cart from '../../pages/Cart';
import Checkout from '../../pages/Checkout';
import ProductDetails from '../../pages/ProductDetails';

export const homeRoute = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: "/list_page",
		element: <ListPage />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/checkout",
		element: <Checkout />,
	},
	{
		path: "/product/:id",
		element: <ProductDetails />,
	}
];
