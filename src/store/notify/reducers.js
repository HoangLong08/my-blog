import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notify",
	initialState: {
		alerts: [],
	},
	reducers: {
		createAlert: (state, action) => {
			state.alerts.push({
				message: action.payload.message,
				type: action.payload.type,
			});
		},

		setAlert: (state, action) => {
			state.notifies = action.payload;
		},
	},

	extraReducers: {},
});

export const { createAlert, setAlert } = notificationSlice.actions;

export default notificationSlice.reducer;
