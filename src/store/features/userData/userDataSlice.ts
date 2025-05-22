import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userDataState {
  email: string;
}

const initialState: userDataState = { email: "" };

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userDataSlice.actions;

export default userDataSlice.reducer;
