import React, { useState } from "react";
import "./registration.scss";
import { Link } from "react-router-dom";
import { postLogin, postUser } from "../../api/allRequests";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Password from "../../utils/validatorPassword";
import validator from "validator";

export function Registration(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function messageError() {
    if (confirmPassword === password) {
      setMessage("");
    } else {
      setMessage("Паролі не співпадають");
    }
  }

  return (
    <section className="wrapperRegistration">
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
      <div className="registration">
        <h1>Регістрація</h1>
        <form action="registrationForm">
          <label htmlFor="email">
            Email
            <br />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event?.target.value)}
              onInput={() => setMessage("")}
              onBlur={() => {
                if (validator.isEmail(email)) {
                  setMessage("");
                } else {
                  setMessage("Перевірте правильність email");
                }
              }}
            />
          </label>
          <br />
          <Password pass={password} setPass={setPassword} />
          <label htmlFor="passTwo">
            Повторіть пароль
            <br />
            <input
              id="passTwo"
              type="password"
              value={confirmPassword}
              required
              onChange={(event) => setConfirmPassword(event?.target.value)}
              onBlur={() => messageError()}
            />
          </label>
          <br />
          <div style={{ color: "red" }}> {message} </div>
          <button
            type="button"
            onClick={() => {
              if (password !== "" && message === "") {
                postUser(email, password)
                  .then(() => postLogin(email, password))
                  .then((data) => {
                    if (data.status == 200) {
                      console.log(password + " " + message);
                      localStorage.setItem("tokenStorage", data.data.token);
                      localStorage.setItem("emailStorage", email);
                      localStorage.setItem("refreshTokenStorage", data.data.refreshToken);
                      document.location.href = "/";
                    } else {
                      toast.warn("Щось пішло не так, спробуйте увійти заново");
                    }
                  })
                  .catch(() => toast.warn("Спробуйте інші дані для входу"));
              }
            }}
          >
            Зареєструватися
          </button>
        </form>
        <p>
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </section>
  );
}
