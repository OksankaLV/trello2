import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "./hooks";

export interface IUser {
  email: string | null;
  token: string | null;
  id: number | null;
}

const initialState: IUser = {
  email: "",
  token: "",
  id: null,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const selectCard = (state: RootState) => state.user;
export default userSlice.reducer;
