import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "./hooks";

export interface IUser {
  user: string;
}

const initialState: IUser = {
  user: "",
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectCard = (state: RootState) => state.user;
export default userSlice.reducer;
