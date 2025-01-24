import axios from 'axios';

export const loginWithGoogle = async () => {
	try {
		const response = await axios
			.get('http://localhost:3000/auth/google')
			.then((response) => {
				console.log(response);
			});
		return response.data;
	} catch (error) {
		console.error('Error logging in with Google:', error);
		throw error;
	}
};
