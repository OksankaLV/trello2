import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, postLogin } from "../../api/allRequests";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrapperLogin">
      <form action="registrationForm">
        <label htmlFor="email">
          Email
          <br />
          <input
            id="email"
            type="email"
            value={email}
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
            onChange={(event) => setPassword(event?.target.value)}
          />
        </label>

        <br />
        <button
          type="submit"
          onClick={() => {
            postLogin(email, password).then((data) => console.log(data));
          }}
        >
          {" "}
          Увійти{" "}
        </button>
      </form>
      <p>
        <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default Login;
