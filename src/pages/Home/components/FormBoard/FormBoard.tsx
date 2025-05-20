import "./formBoard.scss";
import React, { useState } from "react";
import { postBoard } from "../../../../api/allRequests";
import { validation } from "../../../../utils/validationText";
import { toast } from "react-toastify";

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormBoard = ({ active, setActive }: IForm): JSX.Element => {
  const [titleBoard, setTitleBoard] = useState("");
  const [colorBoard, setColorBoard] = useState("#00000000");

  async function addBoard() {
    if (validation(titleBoard)) {
      await postBoard(titleBoard, { background: colorBoard });
      setActive(false);
    } else {
      toast.warn(
        `Ім'я дошки не повинно бути порожнім, у ньому можна використовувати цифри, 
        літери(а, А), пробіли, тире, крапки, нижні підкреслення`
      );
    }
  }

  return (
    <form className={active ? "newBoard" : "noneBoard"}>
      <div className="formBoard">
        <input
          type="text"
          placeholder={"Введіть назву дошки"}
          autoFocus={true}
          value={titleBoard}
          onChange={(event) => setTitleBoard(event?.target.value)}
        />
        <span>
          Оберіть колір дошки
          <input
            type="color"
            value={colorBoard}
            onChange={(event) => setColorBoard(event?.target.value)}
          />{" "}
        </span>
        <button type="button" onClick={addBoard}>
          Зберегти дошку
        </button>
      </div>
    </form>
  );
};
