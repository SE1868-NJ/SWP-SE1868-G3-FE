import axios from 'axios';

export const getProducts = () => {
	return axios.get('https://dummyjson.com/products');
};
