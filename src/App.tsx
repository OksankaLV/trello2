import "./App.css";
import "react-toastify/scss/main.scss";
import { Home } from "./pages/Home/Home";
import { Board } from "./pages/Board/Board";
import { Registration } from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import { CardModalId } from "./pages/Board/components/CardModal/CardModalId";
import { HashRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./hooks/use-auth";

function App(): React.JSX.Element {
  return (
    <>
      <HashRouter>
        <ToastContainer position="top-center" autoClose={5000} rtl={false} />
        <Routes>
          <Route
            path="/"
            element={useAuth().token !== undefined ? <Home /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/board/:board_id" element={<Board />} />
          <Route
            path="/board/:board_id/card/:card_id"
            element={<CardModalId />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
