import { createSlice  } from "@reduxjs/toolkit";

export interface IlistState{
    activeCard: boolean,
    board: any,
    card: any
    status: string,
    error: any
    
}

const initialState: IlistState = {
    activeCard: false,
    board: [],
    card: {},
    status: '',
    error: ''
}

const listSlice = createSlice({
    name: "activeList",
    initialState,
    reducers: {
        activeCard: (state, action) => {state.activeCard = true, state.card = action.payload},
        deActiveCard: (state) => {state.activeCard = false, state.card = initialState.card},
        boardFetching: (state ) => {
            state.status='isLoading'},
        boardFetchingSuccess: (state, action) => {
            state.status='Loading', state.error='', state.board = action.payload},
        boardFetchingError: (state, action) => {
            state.status='error', state.error=action.payload},

    }
});

export const {activeCard, deActiveCard, boardFetching, boardFetchingError, boardFetchingSuccess} = listSlice.actions
export default listSlice.reducer;



