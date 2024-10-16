import React, { useEffect, useState } from "react";
import { listsStart } from "../../utils/data/Lists";
import { List } from "./components/Lists/List";
import { Button } from "./components/Button";
import "./board.scss";
import { Link, useParams } from "react-router-dom";
import { deleteBoard, putBoard } from "../../utils/allRequests";
import { FormList } from "./components/FormList/FormList";
import { ReplaceTitle } from "./components/ReplaceTitle/ReplaceTitle";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBoard } from "../../store/ActionCreator";
import ProgressBarNew from "../ProgressBar/ProgressBarNew";
import ICard from "../../common/interfaces/ICard";

export const Board = function (): JSX.Element {
  const [lists, setLists] = useState(listsStart);
  const [progressValue, setProgressValue] = useState(0);
  const { board_id } = useParams();

  const activeModalCard = useAppSelector((state) => state.trello.activeCard);
  const listsFromStore =
    useAppSelector((state) => state.trello.board.lists) || [];
  const titleFromStore = useAppSelector((state) => state.trello.board.title);
  const error = useAppSelector((state) => state.trello.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoard(Number(board_id)))
      .then(() => {
        setProgressValue(100);
      })
      .catch(() => toast.warn(error));
  }, [activeModalCard, lists]);

  useEffect(() => {
    if (error) {
      toast.warn(error, {
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        closeOnClick: true,
      });
    }
  }, [error]);

  document.title = titleFromStore;

  const listItems = listsFromStore.map(
    (el: { id: number; title: string; cards: ICard[] }, index: number) => (
      <List
        setLists={setLists}
        key={el.id}
        id={el.id}
        titleList={el.title}
        cards={el.cards}
        position={index}
      />
    )
  );

  return (
    <div className="wrapper">
      <ToastContainer />
      {progressValue < 100 ? <ProgressBarNew value={progressValue} /> : <></>}
      <div className="header">
        <Link to={`/`}>
          <Button name={"На головну сторінку"} />
        </Link>
        <div className="title">
          <ReplaceTitle
            board_id={board_id}
            title={titleFromStore}
            nameRequest={putBoard}
          />
        </div>
        <div>{board_id}</div>
      </div>
      <div className="lists">{listItems} </div>

      <AddFormList
        board_id={board_id}
        position={listItems.length}
        setLists={setLists}
      />
    </div>
  );
};

interface IFormList {
  board_id: string | undefined;
  position: number;
  setLists: React.Dispatch<React.SetStateAction<any>>;
}

function AddFormList({ board_id, position, setLists }: IFormList) {
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
