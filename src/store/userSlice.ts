import { createSlice  } from "@reduxjs/toolkit";
import { type RootState } from "./hooks";



export interface IUser{
    user: string,    
}

const initialState: IUser = {
    user: ''
}

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        getUser: (state, action) => {state.user = action.payload},

    },    
});

export const { getUser} = userSlice.actions
export const selectCard = (state: RootState) => state.user
export default userSlice.reducer;