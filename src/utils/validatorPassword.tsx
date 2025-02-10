import React from "react";
import { useState } from "react";
import validator from "validator";
import ValidationProgress from "../pages/Registration/ValidationProgress";

const Password = ({
  pass,
  setPass,
  setValid,
}: {
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<string>>;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [valueProgress, setValueProgress] = useState(6);
  const [validationMessage, setValidationMessage] = useState(pass);
  const [messageColor, setMessageColor] = useState("black"); // Initial color

  const validate = (value: string) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
    ) {
      setValidationMessage("Надійний пароль!");
      setMessageColor("green");
      setValueProgress(5);
      setValid(true);
    } else {
      setMessageColor("red");
      setValid(false);
      setValidationMessage(
        "Має містити маленьку, велику букви, цифру, спецсимвол і хоча б 8 символів"
      );
      setValueProgress(
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
          returnScore: true,
          pointsPerUnique: 0,
          pointsPerRepeat: 0,
          pointsForContainingLower: 1,
          pointsForContainingUpper: 1,
          pointsForContainingNumber: 1,
          pointsForContainingSymbol: 1,
        })
      );
    }
    setPass(value);
  };

  return (
    <div className="password">
      <label htmlFor="pass">
        Пароль
        <br />
        <input
          id="pass"
          type="password"
          required={true}
          onChange={(e) => validate(e.target.value)}
        />
        <div className="validationMessage">
          <p style={{ color: messageColor }}>{validationMessage}</p>
        </div>
      </label>
      <ValidationProgress valueProgress={valueProgress} />
    </div>
  );
};

export default Password;
