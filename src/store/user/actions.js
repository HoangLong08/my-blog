import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getAllUserApi,
} from "api/user";
import openNotificationWithIcon from "utils/notification";

const getAllUserAction = createAsyncThunk(
	"post/getAllUserAction",
	async (params, thunkAPI) => {
		try {
			const res = await getAllUserApi();
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Get list user error" });
		}
	}
);

export { getAllUserAction }
