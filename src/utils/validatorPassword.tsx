import React from "react";
import { useState } from "react";
import validator from "validator";
import ValidationProgress from "../pages/Registration/ValidationProgress";

const Password = ({
  pass,
  setPass,
}: {
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const [valueProgress, setValueProgress] = useState(6);
  const [validationMessage, setValidationMessage] = useState(pass);
  const [messageColor, setMessageColor] = useState("black"); // Initial color

  const validate = (value: string) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 3,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
    ) {
      setValidationMessage("Надійний пароль!");
      setMessageColor("green");
      setValueProgress(5);
    } else {
      setMessageColor("red");
      setValueProgress(0);

      let i = 0;
      let message = "Пароль має містити:";

      if (!value.match(/[a-z]+/)) {
        message = message + " маленьку букву,";
      } else {
        i += 1;
      }
      if (!value.match(/[A-Z]+/)) {
        message = message + " велику букву,";
      } else {
        i += 1;
      }
      if (!value.match(/[0-9]+/)) {
        message = message + " цифру,";
      } else {
        i += 1;
      }
      if (value.length < 8) {
        message = message + " має бути більше 8 символів, ";
      } else {
        i += 1;
      }
      if (!value.match(/[\W]+/)) {
        message = message + " спеціальний символ";
      } else {
        i += 1;
      }
      setValidationMessage(message);
      setValueProgress(i);
    }
    setPass(value);
  };

  return (
    <div className="password">
      <form action="post">
        <label htmlFor="pass">
          Пароль
          <br />
          <input
            id="pass"
            type="password"
            required
            onChange={(e) => validate(e.target.value)}
          />
          <div className="validationMessage">
            <p style={{ color: messageColor }}>{validationMessage}</p>
          </div>
        </label>
      </form>
      <ValidationProgress valueProgress={valueProgress} />
    </div>
  );
};

export default Password;
