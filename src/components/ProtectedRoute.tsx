import React, { FC } from 'react'
import { useAuth } from '../hooks/use-auth'
import { Navigate, useLocation } from 'react-router-dom'

interface Props{
    children: JSX.Element
}


export const ProtectedRoute: FC<Props> = ({children}) => {
  
  const isAuth = useAuth().token 

  const location = useLocation();
  const url = new URLSearchParams();
  url.set("redirect", location.pathname + location.search); 

  return (<>
    {isAuth? (children) : (<Navigate to={{pathname:"/login", search: url.toString()}}/>)}
    </>)
}


