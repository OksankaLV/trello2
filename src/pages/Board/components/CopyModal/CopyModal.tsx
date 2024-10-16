import React, { useEffect, useState } from "react";
import "./copyModal.scss";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { axiosBoard } from "../../../../store/ActionCreator";
import IBoard from "../../../../common/interfaces/IBoard";
import { deleteCard, getBoard, postCard } from "../../../../utils/allRequests";
import { useParams } from "react-router-dom";
import IList from "../../../../common/interfaces/IList";

interface IModal {
  titleCard: string;
  setAction: React.Dispatch<
    React.SetStateAction<{ copy: boolean; move: boolean }>
  >;
  typyAction: "Move" | "Copy";
  description: string | undefined;
}

export const CopyMoveModal = ({
  titleCard,
  setAction,
  typyAction,
  description,
}: IModal): JSX.Element => {
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => state.boards.data);
  const status = useAppSelector((state) => state.boards.status);
  const [title, setTitle] = useState(titleCard);
  const [boardIdAction, setBoardIdAction] = useState("");
  const [listAction, setListAction] = useState("");
  const [lists, setLists] = useState({ lists: [] });
  const [position, setPosition] = useState("");
  const { card_id } = useParams();
  const { board_id } = useParams();

  useEffect(() => {
    if (status === "") {
      dispatch(axiosBoard());
    }
  }, [status, board]);
  useEffect(() => {
    getBoard(boardIdAction).then((data) => {
      setLists(data);
    });
  }, [boardIdAction]);

  const OptionBoard = board.boards?.map((obj: IBoard) => (
    <option key={obj.title} value={obj.id}>
      {obj.title}
    </option>
  ));
  const OptionList = lists.lists?.map((obj: IList) => (
    <option key={obj.id} value={obj.id}>
      {obj.title}
    </option>
  ));

  function handleClick(typyAction: string): void {
    if (typyAction == "Copy") {
      postCard(title, boardIdAction, +listAction, +position, description).then(
        () => setAction({ copy: false, move: false })
      );
    } else {
      // typeAction="Move"
      postCard(title, boardIdAction, +listAction, +position, description)
        .then(() => deleteCard(board_id, card_id))
        .then(() => setAction({ copy: false, move: false }));
    }
  }

  return (
    <div className="wrapperModal">
      <div className="copyCard">
        <h1> Копіювати картку </h1>
        <textarea
          name=""
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>
          на дошку
          <select
            name=""
            id=""
            onChange={(e) => setBoardIdAction(e.target.value)}
          >
            <option value="">...</option>
            {OptionBoard}
          </select>
        </p>
        <p>
          лист
          <select onChange={(e) => setListAction(e.target.value)}>
            <option value="">...</option>
            {OptionList}
          </select>
        </p>
        <p>
          позиція
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </p>

        <button onClick={() => handleClick(typyAction)}>
          {" "}
          {typyAction == "Copy" ? "Копіювати" : "Перемістити"}{" "}
        </button>
        <button
          onClick={() => {
            setAction({ copy: false, move: false });
          }}
        >
          {" "}
          Відмінити{" "}
        </button>
      </div>
    </div>
  );
};
