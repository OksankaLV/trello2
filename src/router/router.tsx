import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { Home } from "../pages/Home/Home";
import { Board } from "../pages/Board/Board";
import Login from "../pages/Login/Login";
import { CardModalId } from "../pages/Board/components/CardModal/CardModalId";
import { Registration } from "../pages/Registration/Registration";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { GuestRouter } from "../components/GuestRouter";

export const router = createBrowserRouter([
    {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        {
            path: "/login",
            element: <GuestRouter><Login /></GuestRouter>,
        },
        {
            path: "/board/:board_id",
            element: <ProtectedRoute><Board /></ProtectedRoute>,
        },
        {
            path: "/board/:board_id/card/:card_id",
            element: <ProtectedRoute><CardModalId /></ProtectedRoute>,
        },
        {
            path: "/register",
            element: <GuestRouter><Registration /></GuestRouter>,
        }

    ]
}])