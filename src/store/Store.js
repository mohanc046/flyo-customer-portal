import { configureStore } from "@reduxjs/toolkit";
import toasterReducer from "./reducers/toasterSlice";
import spinnerReducer from "./reducers/spinnerSlice";
import storeDetailsReducer from "./reducers/storeSlice";

export const store = configureStore({
  reducer: {
    toaster: toasterReducer,
    spinner: spinnerReducer,
    storeDetails: storeDetailsReducer,
  },
});

export default store;
