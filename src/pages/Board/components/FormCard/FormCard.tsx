import React, { useState } from "react";
import { getBoard, postCard } from "../../../../api/allRequests";
import { validation } from "../../../../utils/validationText";
import "./formCard.scss";
import { toast } from "react-toastify";

interface IForm {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<any>;
  board_id?: string | undefined;
  list_id: number | undefined;
  id?: number | undefined;
}

export const FormCard = (props: IForm): JSX.Element => {
  const { active, setActive, board_id, list_id, id, setLists } = props;

  function addCard(
    titleCard: string,
    board_id: string | undefined,
    list_id: number | undefined,
    id: number | undefined
  ) {
    if (validation(titleCard)) {
      postCard(titleCard, board_id, list_id, id)
        .then(() => getBoard(board_id))
        .then((data) => setLists(data.lists))
        .catch((error) => toast.warn(error));
    } else {
      toast.warn(
        "ім'я не повинно бути порожнім, у ньому можна використовувати цифри, літери (а, А), пробіли, тире, крапки, нижні підкреслення"
      );
    }
  }

  const [titleCard, setTitleList] = useState("");

  return (
    <form name="newCard" className={active ? "newList" : "noneList"}>
      <div className="formList">
        <input
          id={list_id?.toString()}
          name={list_id?.toString()}
          autoFocus={true}
          type="text"
          placeholder="Введіть назву картки"
          value={titleCard}
          onChange={(event) => setTitleList(event?.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          addCard(titleCard, board_id, list_id, id);
          setActive(false);
        }}
      >
        Зберегти
      </button>
      <button
        onClick={() => {
          setActive(false);
        }}
      >
        Відмінити
      </button>
    </form>
  );
};
