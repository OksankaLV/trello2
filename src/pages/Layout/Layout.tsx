import React from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

const Layout = ():React.JSX.Element =>{

    return(<>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        rtl={false}
        pauseOnHover={true}
        draggable={true}
        theme={"colored"}
        transition={Bounce}
        closeOnClick={true}
      />
        <Outlet/>
    </>)
}

export default Layout;