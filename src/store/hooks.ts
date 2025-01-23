import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import listReducer from "./listSlice";
import userReducer from "./userSlice";
import boardsReducer from "./boardsSlice";

export const store = configureStore({
  reducer: {
    trello: listReducer,
    boards: boardsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
