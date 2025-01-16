import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreDetailsState {
  storeData: any;
}

const initialState: StoreDetailsState = {
  storeData: null,
};

const storeSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {
    setStoreData(state, action: PayloadAction<any>) {
      state.storeData = action.payload;
    },
  },
});

export const { setStoreData } = storeSlice.actions;

export default storeSlice.reducer;
