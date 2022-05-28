import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./post/reducers";
import authSlice from "./auth/reducers";
import categorySlice from "./category/reducers";
import userSlice from "./user/reducers"

const store = configureStore({
	reducer: {
		authSlice,
		postSlice,
		categorySlice,
		userSlice,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
