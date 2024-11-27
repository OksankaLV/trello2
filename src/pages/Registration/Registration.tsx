import React, { useState } from "react";
import "./registration.scss";
import { Link } from "react-router-dom";
import { postUser } from "../../api/allRequests";
import { toast } from "react-toastify";

export function Registration(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoPassword, setTwoPassword] = useState("");

  function passValid() {
    if (twoPassword === password) {
      return password;
    } else {
      toast.warn("Перевірте корректність введених данних");
      return null;
    }
  }

  return (
    <section className="wrapperRegistration">
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
          <div className="passEnter">
            <div id="passOne"></div>
            <div id="passTwo"></div>
            <div id="passThree"></div>
            <div id="passFour"></div>
          </div>
          <label htmlFor="passTwo">
            Повторіть пароль
            <br />
            <input
              id="passTwo"
              type="password"
              value={twoPassword}
              onChange={(event) => setTwoPassword(event?.target.value)}
            />
          </label>
          <br />
          <button
            type="submit"
            onClick={() => {
              postUser(email, passValid());
            }}
          >
            {" "}
            Зареєструватися{" "}
          </button>
        </form>
        <p>
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </section>
  );
}
