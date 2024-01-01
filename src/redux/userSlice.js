import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		//LOGIN START
		loginStart: (state) => {
			state.isFetching = true;
		},

		//LOGIN SUCCESS
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.error = false;
		},

		//LOGIN FAILURE
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},

		//LOGOUT
		logout: (state) => {
			state.currentUser = null;
			state.isFetching = false;
			state.error = false;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
