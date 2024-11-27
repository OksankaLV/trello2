import { useSelector, UseSelector } from "react-redux";

export function useAuth() {
  const email = localStorage.getItem("emailStorage");
  const token = localStorage.getItem("tokenStorage");
  const id = localStorage.getItem("idStorage");

  console.log(email);
  console.log(token);
  console.log(id);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
