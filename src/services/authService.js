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
};
