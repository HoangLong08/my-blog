import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCategoryApi, getListCategoryApi, getDetailCategoryApi, editCategoryApi, deleteCategoryApi } from "api/category";
import openNotificationWithIcon from "utils/notification";

const getListCategoryAction = createAsyncThunk("category/getListCategoryAction", async (params, thunkAPI) => {
	try {
		const { role } = params;
		const res = await getListCategoryApi(role);
		return res;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "get list category error" });
	}
});

const getDetailCategoryAction = createAsyncThunk("category/getDetailCategoryAction", async (params, thunkAPI) => {
	try {
		const { idCategory } = params;
		const res = await getDetailCategoryApi(idCategory);
		return res;
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
		return thunkAPI.rejectWithValue({ error: "get detail category error" });
	}
});

const addCategoryAction = createAsyncThunk("category/addCategoryAction", async (params, thunkAPI) => {
	try {
		const { title } = params;
		const res = await addCategoryApi(title);
		openNotificationWithIcon('success', '', "Thêm tag thành công", 'topRight', 5)
		return res;
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
		return thunkAPI.rejectWithValue({ error: "add category error" });
	}
});

const editCategoryAction = createAsyncThunk("category/editCategoryAction", async (params, thunkAPI) => {
	try {
		const { idCategory, title } = params;
		const res = await editCategoryApi(idCategory, title);
		openNotificationWithIcon('success', '', "Chỉnh sửa tag thành công", 'topRight', 5)
		return res;
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
		return thunkAPI.rejectWithValue({ error: "edit category error" });
	}
});

const deleteCategoryAction = createAsyncThunk("category/deleteCategoryAction", async (params, thunkAPI) => {
	try {
		const { idCategory } = params;
		const res = await deleteCategoryApi(idCategory);
		openNotificationWithIcon('success', '', "Xóa tag thành công", 'topRight', 5)
		return res;
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
		return thunkAPI.rejectWithValue({ error: "delete category error" });
	}
});


export { getListCategoryAction, getDetailCategoryAction, addCategoryAction, editCategoryAction, deleteCategoryAction }
