import './formBoard.scss';
import React, { useEffect, useState } from 'react';
import { postBoard } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import { toast } from 'react-toastify';

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}


function addBoard(titleBoard: string, custom: object) {
  if (validation(titleBoard)) {
    postBoard(titleBoard, custom)
    .then((req) => alert(`Дошку з ID = ${req.id} успішно дадано`))
    .catch((error)=>alert(error));
  } else {
    alert(
      "ім'я дошки не повинно бути порожнім, у ньому можна використовувати цифри, літери (а, А), пробіли, тире, крапки, нижні підкреслення"
    );
  }
}

export const FormBoard = ({ active, setActive }: IForm): JSX.Element => {
  const [titleBoard, setTitleBoard] = useState('');
  const [colorBoard, setColorBoard] = useState('');

  return (
    <form className={active ? 'newBoard' : 'noneBoard'}>
      <div className="formBoard">
        <input type="text" placeholder={'Введіть назву дошки'} value={titleBoard} onChange={(event) => setTitleBoard(event?.target.value)} />
        <span>Оберіть колір дошки 
        <input type="color" value={colorBoard} onChange={(event) => setColorBoard(event?.target.value)} /> </span>
        <button
          type="submit"
          onClick={() => {
            addBoard(titleBoard, { background: colorBoard }); setActive(false)
          }}
        >
          Зберегти дошку
        </button>
      </div>
    </form>
  );
};
