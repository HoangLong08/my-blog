import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, forgotPassword, logout, register, loginWithGoogle } from "api/auth";
import { isEmpty } from "lodash";
import { setInfoUser } from "store/auth/reducers";
import openNotificationWithIcon from "utils/notification";

const loginAction = createAsyncThunk("auth/loginAction", async (params, thunkAPI) => {
	try {
		const { email, password, role } = params;
		const res = await login(email, password, role);
		const { type, message, data } = res;
		if (!isEmpty(data)) {
			sessionStorage.setItem("infoUser", JSON.stringify(data));
			thunkAPI.dispatch(setInfoUser(data));
		}
		openNotificationWithIcon(type, '', message, 'topRight', 5)
		return res;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "Login fails" });
	}
});

const registerAction = createAsyncThunk("auth/registerAction", async (params, thunkAPI) => {
	try {
		const { email, password, fullName } = params;
		const res = await register(fullName, email, password);
		const { type, message } = res;
		openNotificationWithIcon(type, '', message, 'topRight', 5)
		return res;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "Register fails" });
	}
});

const forgotPasswordAction = createAsyncThunk(
	"auth/forgotPasswordAction",
	async (params, thunkAPI) => {
		try {
			const { email } = params;
			const res = await forgotPassword(email);
			const { type, message } = res;
			openNotificationWithIcon(type, '', message, 'topRight', 5)
			return res;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "forgot password error" });
		}
	}
);

const logoutAction = createAsyncThunk(
	"auth/logoutAction",
	async (params, thunkAPI) => {
		try {
			const res = await logout();
			const { type, message } = res;
			openNotificationWithIcon(type, '', message, 'topRight', 5)
			return res;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "logout error" });
		}
	}
);

const loginWithGoogleAction = createAsyncThunk(
	"auth/loginWithGoogleAction",
	async (params, thunkAPI) => {
		try {
			const { typeAuth } = params
			const res = await loginWithGoogle(typeAuth);
			const { type, message, data } = res;
			if (type === "success") {
				sessionStorage.setItem("infoUser", JSON.stringify(data));
				thunkAPI.dispatch(setInfoUser(data));
			}
			openNotificationWithIcon(type, '', message, 'topRight', 5)
			return res;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "auth error" });
		}
	}
);

export { loginAction, registerAction, forgotPasswordAction, logoutAction, loginWithGoogleAction };
