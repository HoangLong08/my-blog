import { createSlice } from "@reduxjs/toolkit";
import {
	getAllUserAction,
} from "./actions";

const userSlice = createSlice({
	name: "user",
	initialState: {
		listUser: {
			data: [],
			load: false,
			error: "",
		},
	},
	reducers: {},

	extraReducers: {
		[getAllUserAction.pending]: (state) => {
			state.listUser.load = true;
			state.listUser.error = "";
		},
		[getAllUserAction.fulfilled]: (state, action) => {
			state.listUser.load = false;
			state.listUser.data = action.payload;
			state.listUser.error = "";
		},
		[getAllUserAction.rejected]: (state, action) => {
			state.listUser.load = false;
			state.listUser.error = action.payload.error;
		},
	},
});

export default userSlice.reducer;
