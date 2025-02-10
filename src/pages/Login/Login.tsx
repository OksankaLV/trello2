import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../api/reguestsUser";
import "./login.scss";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../../hooks/use-auth";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await postLogin(email, password);
      if (data) {
        setTokenToLocalStorage(data);
        dispatch(setUser({ email: email, token: data.data.token }));
        navigate(-1);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Комбінація логіну та паролю не дійсна, спробуйте ще раз");
      } else {
        toast.error("Виникла несподівана помилка, спробуйте ще раз");
      }
    }
  };

  return (
    <div className="wrapperLogin">
      <form onSubmit={loginHandler}>
        <label htmlFor="email">
          Email
          <br />
          <input
            id="email"
            type="email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event?.target.value)}
          />
        </label>
        <br />
        <label htmlFor="pass">
          Пароль
          <br />
          <input
            id="pass"
            type="password"
            value={password}
            required={true}
            onChange={(event) => setPassword(event?.target.value)}
          />
        </label>

        <br />
        <button>Увійти</button>
        <div className="registration-link">
          <Link to="/register">Зареєструватися</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
