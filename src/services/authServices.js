import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const login = async (email, password, token) => {
	try {
		const request = email && password ? { data: { email, password } } : { headers: { authorization: token } };
		const response = await axios('/auth/login', {
			method: 'POST',
			...request
		});
		return response.data;
	} catch (err) {
		throw new Error(err);
	}
};

export const signup = async (email, password) => {
	try {
		const response = await axios.post('/auth/signup', {
			email,
			password
		});
		return response.data;
	} catch(err) {
		throw new Error(err);
	}
}