import axios from 'axios';

export const authService = {
	register: async (userData) => {
		const response = await axios.post(
			'http://localhost:4000/auth/register',
			userData
		);
		return response.data.data;
	},
	login: async (loginData) => {
		const response = await axios.post(
			'http://localhost:4000/auth/login',
			loginData
		);
		return response.data.data;
	},
};
