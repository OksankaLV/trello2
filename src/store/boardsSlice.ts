import { createSlice } from "@reduxjs/toolkit";
import { axiosBoard } from "./ActionCreator";

export interface IBoardState {
  status: string;
  data: any;
  error: string;
}

const initialState: IBoardState = {
  status: "",
  data: [],
  error: "",
};

const boardsSlice = createSlice({
  name: "axiosBoards",
  initialState,
  reducers: {
    updateBoard: (state) => {
      state.status = "update";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(axiosBoard.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(axiosBoard.fulfilled, (state, action) => {
      (state.status = "fulfilled"),
        (state.error = ""),
        (state.data = action.payload);
    });
    builder.addCase(axiosBoard.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { updateBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
