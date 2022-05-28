import { createSlice } from "@reduxjs/toolkit";

const infoUser = JSON.parse(sessionStorage.getItem("infoUser"));
const authSlice = createSlice({
	name: "auth",
	initialState: {
		data: infoUser || {},
		load: false,
		error: "",
	},
	reducers: {
		setInfoUser: (state, action) => {
			sessionStorage.setItem("infoUser", JSON.stringify(action.payload));
			state.data = action.payload;
		},
	},

	extraReducers: {},
});

export const { setInfoUser } = authSlice.actions;

export default authSlice.reducer;
