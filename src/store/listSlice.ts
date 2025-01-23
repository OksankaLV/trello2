import { createSlice } from "@reduxjs/toolkit";

export interface IlistState {
  activeCard: boolean;
  board: any;
  card: any;
  status: string;
  error: string;
}

const initialState: IlistState = {
  activeCard: false,
  board: [],
  card: {},
  status: "",
  error: "",
};

const listSlice = createSlice({
  name: "activeList",
  initialState,
  reducers: {
    activeCard: (state, action) => {
      (state.activeCard = true), (state.card = action.payload);
    },
    deActiveCard: (state) => {
      (state.activeCard = false), (state.card = initialState.card);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setColorBoard: (state, action) => {
      state.board.custom = action.payload;
    },
    boardFetching: (state) => {
      state.status = "isLoading";
    },
    boardFetchingSuccess: (state, action) => {
      (state.status = "Loading"),
        (state.error = ""),
        (state.board = action.payload);
    },
    boardFetchingError: (state, action) => {
      (state.status = "error"), (state.error = action.payload);
    },
  },
});

export const {
  activeCard,
  deActiveCard,
  setError,
  setColorBoard,
  boardFetching,
  boardFetchingError,
  boardFetchingSuccess,
} = listSlice.actions;
export default listSlice.reducer;
