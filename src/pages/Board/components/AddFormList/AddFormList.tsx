import React, { useState } from "react";
import { FormList } from "../FormList/FormList";
import { deleteBoard } from "../../../../api/allRequests";
import { Link } from "react-router-dom";

interface IFormList {
  board_id: string | undefined;
  position: number;
  setLists: React.Dispatch<React.SetStateAction<any>>;
}

export function AddFormList({ board_id, position, setLists }: IFormList) {
  const [newListActive, setNewListActive] = useState(false);
  if (newListActive) {
    return (
      <FormList
        active={newListActive}
        setActive={setNewListActive}
        id={board_id}
        position={position}
        setLists={setLists}
      />
    );
  }
  return (
    <>
      <button
        className="listButton"
        onClick={() => setNewListActive(!newListActive)}
      >
        {" "}
        Додати новий список{" "}
      </button>
      <Link to="/">
        <button
          onClick={() => {
            deleteBoard(board_id);
            setNewListActive(!newListActive);
          }}
        >
          {" "}
          Видалити дошку{" "}
        </button>{" "}
      </Link>
    </>
  );
}
