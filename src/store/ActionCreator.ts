// reducers for async wait

import axios from "axios";
import api from "../common/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  boardFetching,
  boardFetchingError,
  boardFetchingSuccess,
} from "./listSlice";
import { AppDispatch } from "./hooks";
import { Key } from "react";
import { useAuth } from "../hooks/use-auth";




export const fetchBoard =
  (board_id: number | Key | null | undefined) =>
  async (dispatch: AppDispatch) => {
    const header = { Authorization: `Bearer ${useAuth().token}` };

    try {
      dispatch(boardFetching());
      const response = await axios.get(`${api.baseURL}/board/${board_id}`, {
        headers: header,
      });
      dispatch(boardFetchingSuccess(response.data));
    } catch (e) {
      dispatch(boardFetchingError(e));
    }
  };

export const getBoardWithCreateAsyncThunk = createAsyncThunk(
  "activeList/getBoardWithCreateAsyncThunk",
  async (name, { rejectWithValue }) => {
    const header = { Authorization: `Bearer ${useAuth().token}` };
    const response = await axios.get(`${api.baseURL}/board`, {
      headers: header,
    });
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);
