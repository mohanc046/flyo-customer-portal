import { createSlice } from "@reduxjs/toolkit";

const toasterSlice = createSlice({
  name: "toaster",
  initialState: {
    isVisible: false,
    type: "info", // success, error, info, warning
    title: "",
    message: ""
  },
  reducers: {
    showToast: (state, action) => {
      const { type, title, message } = action.payload;
      state.isVisible = true;
      state.type = type;
      state.title = title;
      state.message = message;
    },
    hideToast: (state) => {
      state.isVisible = false;
    }
  }
});

export const { showToast, hideToast } = toasterSlice.actions;
export default toasterSlice.reducer;
