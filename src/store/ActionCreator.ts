// reducers for async wait

import axios from "axios";
import api from "../common/constants/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardFetching, boardFetchingError, boardFetchingSuccess } from "./listSlice";
import { AppDispatch } from "./hooks";

const token = 123;
const header = { Authorization: `Bearer ${token}` };


export const fetchBoard = (board_id: any)=> async (dispatch: AppDispatch) =>{ 
    try{
        dispatch(boardFetching())
        const response = await axios.get(`${api.baseURL}/board/${board_id}`, {
            headers: header,
          }) 
        dispatch(boardFetchingSuccess(response.data))
    } catch (e:any) {
        dispatch(boardFetchingError(e.message))
    }

}




export const axiosBoard = createAsyncThunk(
    'activeList/axiosBoard',
    async (name, {rejectWithValue}) => {
        const response = await axios.get(`${api.baseURL}/board`, {
        headers: header,
      });
      if (response.status <200 || response.status>=300){
        return rejectWithValue(response.data)
      }
      return response.data
    }
)