import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const userRequest = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
