import { createSlice } from "@reduxjs/toolkit";
import { getBoardWithCreateAsyncThunk } from "./ActionCreator";

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
    builder.addCase(getBoardWithCreateAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getBoardWithCreateAsyncThunk.fulfilled, (state, action) => {
      (state.status = "fulfilled"),
        (state.error = ""),
        (state.data = action.payload);
    });
    builder.addCase(getBoardWithCreateAsyncThunk.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { updateBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
