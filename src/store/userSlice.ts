import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "./hooks";

export interface IUser {
  email: string | null;
  token: string | null;
  id?: number | null;
  isAuth?: boolean;
}

const initialState: IUser = {
  email: "",
  token: "",
  id: null,
  isAuth: false
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const selectCard = (state: RootState) => state.user;
export default userSlice.reducer;
