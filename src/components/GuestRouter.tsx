import React, { FC } from 'react'
import { useAuth } from '../hooks/use-auth'
import { Navigate, useLocation } from 'react-router-dom';

interface Props{
    children: JSX.Element
}

export const GuestRouter: FC<Props> = ({children, ...rest}) => {
    const isAuth = useAuth().token
    const location = useLocation();
    const url = new URLSearchParams(location.search.slice(1))
  return (
    isAuth? <Navigate to={url.get("redirect")||"/"}/>: children
   )
}
