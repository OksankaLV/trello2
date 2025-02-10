import React, { useState } from "react";
import "./registration.scss";
import { Link, useNavigate } from "react-router-dom";
import { postLogin, postUser } from "../../api/reguestsUser";
import { toast } from "react-toastify";
import Password from "../../utils/validatorPassword";
import validator from "validator";
import { setTokenToLocalStorage } from "../../hooks/use-auth";

export function Registration(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  function messageError() {
    if (valid && confirmPassword === password) {
      setMessage("");
      return true;
    } else {
      setMessage("Паролі не співпадають");
      return false;
    }
  }
  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!messageError()) return;
    try {
      const createUser = await postUser(email, password);
      console.log("postUser" + createUser);
      if (createUser) {
        const data = await postLogin(email, password);
        setTokenToLocalStorage(data);
        navigate("/");
      }
    } catch (err: any) {
      toast.error("Виникла помилка, спробуйте ще раз");
    }
  };

  return (
    <section className="wrapperRegistration">
      <div className="registration">
        <h1>Регістрація</h1>
        <form onSubmit={registerHandler}>
          <label htmlFor="email">
            Email
            <br />
            <input
              id="email"
              type="email"
              value={email}
              required={true}
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
          <Password pass={password} setPass={setPassword} setValid={setValid} />
          <label htmlFor="passTwo">
            Повторіть пароль
            <br />
            <input
              id="passTwo"
              type="password"
              value={confirmPassword}
              required={true}
              onChange={(event) => setConfirmPassword(event?.target.value)}
              onBlur={messageError}
            />
          </label>
          <br />
          <div className="validationMessage">
            <p>{message}</p>
          </div>
          <button>Зареєструватися</button>
        </form>
        <p>
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </section>
  );
}
