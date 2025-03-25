import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

export function IsAuthRouter(): React.JSX.Element {
  const isAuth = useAuth().token;
  const location = useLocation();

  if (!isAuth) {
    
    return (
      <Navigate
        to={"/login"}
        state={{
          from: location
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
