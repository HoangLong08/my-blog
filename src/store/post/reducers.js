import { createSlice } from "@reduxjs/toolkit";
import {
	getListPostAction,
	getDetailPostAction,
	getListPostByAuthorAction
} from "./actions";

const postSlice = createSlice({
	name: "post",
	initialState: {
		listPost: {
			data: [],
			load: false,
			error: "",
		},
		detailPost: {
			data: {},
			load: false,
			error: "",
		},
		listPostByAuthor: {
			data: [],
			load: false,
			error: "",
		}
	},
	reducers: {},

	extraReducers: {
		[getListPostAction.pending]: (state) => {
			state.listPost.load = true;
			state.listPost.error = "";
		},
		[getListPostAction.fulfilled]: (state, action) => {
			state.listPost.load = false;
			state.listPost.data = action.payload;
			state.listPost.error = "";
		},
		[getListPostAction.rejected]: (state, action) => {
			state.listPost.load = false;
			state.listPost.error = action.payload.error;
		},

		// ------------------

		[getDetailPostAction.pending]: (state) => {
			state.detailPost.load = true;
			state.detailPost.error = "";
		},
		[getDetailPostAction.fulfilled]: (state, action) => {
			state.detailPost.load = false;
			state.detailPost.data = action.payload;
			state.detailPost.error = "";
		},
		[getDetailPostAction.rejected]: (state, action) => {
			state.detailPost.load = false;
			state.detailPost.error = action.payload.error;
		},

		// ------------------

		[getListPostByAuthorAction.pending]: (state) => {
			state.listPostByAuthor.load = true;
			state.listPostByAuthor.error = "";
		},
		[getListPostByAuthorAction.fulfilled]: (state, action) => {
			state.listPostByAuthor.load = false;
			state.listPostByAuthor.data = action.payload;
			state.listPostByAuthor.error = "";
		},
		[getListPostByAuthorAction.rejected]: (state, action) => {
			state.listPostByAuthor.load = false;
			state.listPostByAuthor.error = action.payload.error;
		},
	},
});

export default postSlice.reducer;
