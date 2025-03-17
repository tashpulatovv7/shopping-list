import axios from 'axios';

const API = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use(req => {
	if (localStorage.getItem('token')) {
		req.headers['x-auth-token'] = `${localStorage.getItem('token')}`;
	}
	return req;
});

API.interceptors.response.use(
	res => res,
	err => {
		if (err.response.status === 401) {
			localStorage.removeltem('token');
			window.location.href = '/login';
		}
		return Promise.reject(err);
	}
);

export default API;
