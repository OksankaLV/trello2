import "./App.css";
import "react-toastify/scss/main.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Board } from "./pages/Board/Board";
import { CardModalId } from "./pages/Board/components/CardModal/CardModalId";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestRouter } from "./components/GuestRouter";

function App(): React.JSX.Element {
  return (
    <>
      <HashRouter>
        <ToastContainer position="top-center" autoClose={5000} rtl={false} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRouter>
                <Login />
              </GuestRouter>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRouter>
                <Registration />
              </GuestRouter>
            }
          />
          <Route
            path="/board/:board_id"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path="/board/:board_id/card/:card_id"
            element={
              <ProtectedRoute>
                <CardModalId />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
