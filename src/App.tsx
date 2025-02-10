import "./App.css";
import "react-toastify/scss/main.scss";
import { RouterProvider } from "react-router-dom";
import React from "react";
import { router } from "./router/router";

function App(): React.JSX.Element {
  return ( <RouterProvider router={router}/>
    // <>
    //   <HashRouter>
    //     <ToastContainer position="top-center" autoClose={5000} rtl={false} />
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={token? <Home /> : <Login />}
    //       />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Registration />} />
    //       <Route path="/board/:board_id" element={<Board />} />
    //       <Route
    //         path="/board/:board_id/card/:card_id"
    //         element={<CardModalId />}
    //       />
    //     </Routes>
    //   </HashRouter>
    // </>
  );
}

export default App;
