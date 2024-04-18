import './formBoard.scss';
import React, { useState } from 'react';
import { postBoard } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function addBoard(titleBoard: string, custom: object) {
  if (validation(titleBoard)) {
    postBoard(titleBoard, custom).then((req) => alert(`Дошку з ID = ${req.id} успішно дадано`));
  } else {
    alert(
      "ім'я дошки не повинно бути порожнім, у ньому можна використовувати цифри, літери (а, А), пробіли, тире, крапки, нижні підкреслення"
    );
  }
}

export const FormBoard = ({ active, setActive }: IForm): JSX.Element => {
  const [titleBoard, setTitleBoard] = useState('Введіть назву дошки');
  const [colorBoard, setColorBoard] = useState('blue');

  return (
    <form className={active ? 'newBoard' : 'noneBoard'}>
      <div className="formBoard">
        <input type="text" value={titleBoard} onChange={(event) => setTitleBoard(event?.target.value)} />
        <input type="color" value={colorBoard} onChange={(event) => setColorBoard(event?.target.value)} />
        <button
          type="submit"
          onClick={() => {
            addBoard(titleBoard, { background: colorBoard });
          }}
        >
          Зберегти дошку
        </button>
      </div>
    </form>
  );
};
