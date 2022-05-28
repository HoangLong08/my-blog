import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getListPostApi,
	getDetailPostApi,
	createPostApi,
	deletePostApi,
	getListPostByAuthorApi,
	updatePostApi,
	updateViewPostApi,
	blockOrUnblockPostApi
} from "api/post";
import openNotificationWithIcon from "utils/notification";

const getListPostAction = createAsyncThunk(
	"post/getListPostAction",
	async (params, thunkAPI) => {
		try {
			const { role } = params
			const res = await getListPostApi(role || "");
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Get list post error" });
		}
	}
);

const getDetailPostAction = createAsyncThunk(
	"post/getDetailPostAction",
	async (params, thunkAPI) => {
		try {
			const { idPost } = params
			const res = await getDetailPostApi(idPost);
			await updateViewPostApi(idPost)
			if (res.type === 'success') {
				return res.data;
			} else {
				return thunkAPI.rejectWithValue({ error: "Get detail post error" });
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Get detail post error" });
		}
	}
);

const createPostAction = createAsyncThunk(
	"post/createPostAction",
	async (params, thunkAPI) => {
		try {
			const { categories, html, text, idUser, timeRead, thumbnail, title } = params;
			const res = await createPostApi(categories, html, text, idUser, timeRead, thumbnail, title);
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Get detail post error" });
		}
	}
);

const updatePostAction = createAsyncThunk(
	"post/updatePostAction",
	async (params, thunkAPI) => {
		try {
			const { idPost, title, html, text, categories, thumbnail, timeRead } = params;
			const res = await updatePostApi(idPost, title, html, text, categories, thumbnail, timeRead);
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Get detail post error" });
		}
	}
);

const deletePostAction = createAsyncThunk(
	"post/deletePostAction",
	async (params, thunkAPI) => {
		try {
			const { idPost } = params
			const res = await deletePostApi(idPost);
			openNotificationWithIcon("success", "", "Xóa bài viết thành công", "topRight", 10)
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Get detail post error" });
		}
	}
);

const blockOrUnblockPostAction = createAsyncThunk(
	"post/blockOrUnblockPostAction",
	async (params, thunkAPI) => {
		try {
			const { idPost, status } = params
			const res = await blockOrUnblockPostApi(idPost, status);
			if (status) {
				openNotificationWithIcon("success", "", "Đã khóa bài viết thành công", "topRight", 10)
			} else {
				openNotificationWithIcon("success", "", "Đã mở bài viết thành công", "topRight", 10)
			}
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Approve post error" });
		}
	}
);

const getListPostByAuthorAction = createAsyncThunk(
	"post/getListPostByAuthorAction",
	async (params, thunkAPI) => {
		try {
			const { idUser, limit } = params
			const res = await getListPostByAuthorApi(idUser, limit);
			return res;
		} catch (error) {
			openNotificationWithIcon("error", "", error.message, "topRight", 10)
			return thunkAPI.rejectWithValue({ error: "Get list post error" });
		}
	}
);

export {
	getListPostAction,
	getDetailPostAction,
	createPostAction,
	updatePostAction,
	deletePostAction,
	getListPostByAuthorAction,
	blockOrUnblockPostAction
};

