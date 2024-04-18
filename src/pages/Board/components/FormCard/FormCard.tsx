import React, { useState } from 'react';
import { getBoard, postCard } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import './formCard.scss';

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  board_id?: string | undefined;
  list_id: number | undefined;
  id?: number | undefined;
}

export const FormCard = ({ active, setActive, board_id, list_id, id }: IForm):JSX.Element => {
  function addCard(
    titleCard: string,
    board_id: string | undefined,
    list_id: number | undefined,
    id: number | undefined
  ) {
    if (validation(titleCard)) {
      postCard(titleCard, board_id, list_id, id)
        .then((req) => alert(`Картку з ID = ${req.id} успішно дадано`))
        .then(() => getBoard(board_id))
        .catch((error) => console.log(error));
      setActive(false);
    } else {
      alert(
        "ім'я не повинно бути порожнім, у ньому можна використовувати цифри, літери (а, А), пробіли, тире, крапки, нижні підкреслення"
      );
    }
  }

  const [titleCard, setTitleList] = useState('Введіть назву картки!');

  return (
    <form name="newCard" className={active ? 'newList' : 'noneList'}>
      <div className="formList">
        {' '}
        <input
          id={list_id?.toString()}
          name={list_id?.toString()}
          type="text"
          value={titleCard}
          autoFocus={true}
          onChange={(event) => setTitleList(event?.target.value)}
        />
      </div>
      <button type="submit" onClick={() => addCard(titleCard, board_id, list_id, id)}>
        Зберегти
      </button>
    </form>
  );
};
