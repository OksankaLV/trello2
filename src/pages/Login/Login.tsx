import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postLogin } from "../../api/allRequests";
import "./login.scss";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrapperLogin">
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        rtl={false}
        pauseOnHover={true}
        draggable={true}
        theme={"colored"}
        transition={Bounce}
        closeOnClick={true}
      /> */}
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
          type="button"
          onClick={() => {
            if(password!==""){
            postLogin(email, password)
              .then((data) => {console.log(data)

                if (data.status == 200) {
                  localStorage.setItem("tokenStorage", data.data.token);
                  localStorage.setItem("emailStorage", email);
                  localStorage.setItem(
                    "refreshTokenStorage",
                    data.data.refreshToken
                  );
                  document.location.href = "/";
                } else {
                  console.log("result" + data);
                  toast.warn(data.status);
                }
              })
              .catch(() =>
                toast.warn(
                  "Комбінація логіну та паролю не дійсна, спробуйте ще раз"
                )
              );
          }}}
        >
          Увійти
        </button>
        <div className="registration-link">
          <Link to="/register">Зареєструватися</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
