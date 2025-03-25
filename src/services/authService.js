import axios from 'axios';

export const authService = {
	register: async (userData) => {
		const response = await axios.post(
			'http://localhost:4000/auth/register',
			userData
		);
		console.log(response);
		return response.data.data;
	},

	login: async (loginData) => {
		const response = await axios.post(
			'http://localhost:4000/auth/login',
			loginData
		);
		console.log(response);
		return response.data.data;
	},

	getCurrentUser: async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		const response = await axios.get('http://localhost:4000/auth/me', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		return response.data.data;
	},

	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}
};