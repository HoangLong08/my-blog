import { createSlice } from "@reduxjs/toolkit";
import {
	getListCategoryAction,
} from "./actions";

const categorySlice = createSlice({
	name: "category",
	initialState: {
		listCategory: {
			data: [],
			load: false,
			error: "",
		},
	},
	reducers: {},

	extraReducers: {
		[getListCategoryAction.pending]: (state) => {
			state.listCategory.load = true;
			state.listCategory.error = "";
		},
		[getListCategoryAction.fulfilled]: (state, action) => {
			state.listCategory.load = false;
			state.listCategory.data = action.payload;
			state.listCategory.error = "";
		},
		[getListCategoryAction.rejected]: (state, action) => {
			state.listCategory.load = false;
			state.listCategory.error = action.payload.error;
		},
	},
});

export default categorySlice.reducer;
