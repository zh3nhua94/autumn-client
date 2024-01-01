import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logout } from "./userSlice";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		//passing user data to redux
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const logoutUser = async (dispatch) => {
	dispatch(logout());
};
