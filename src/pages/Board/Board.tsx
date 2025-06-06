import React, { useEffect, useState } from "react";
import { listsStart } from "../../utils/data/Lists";
import { List } from "./components/Lists/List";
import "./board.scss";
import { Link, useParams } from "react-router-dom";
import { ReplaceTitle } from "./components/ReplaceTitle/ReplaceTitle";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBoard } from "../../store/ActionCreator";
import ProgressBarNew from "../ProgressBar/ProgressBarNew";
import ICard from "../../common/interfaces/ICard";
import { AddFormList } from "./components/AddFormList/AddFormList";
import { setColorBoard } from "../../store/listSlice";
import { removeItemTokenStorage } from "../../hooks/use-auth";
import { putBoard } from "../../api/allRequests";

export const Board = function (): React.JSX.Element {
  const [lists, setLists] = useState(listsStart);
  const [progressValue, setProgressValue] = useState(0);
  const { board_id } = useParams();

  const activeModalCard = useAppSelector((state) => state.trello.activeCard);
  const listsFromStore =
    useAppSelector((state) => state.trello.board.lists) || [];
  const titleFromStore = useAppSelector((state) => state.trello.board.title);
  const custom = useAppSelector((state) => state.trello.board.custom);
  const error = useAppSelector((state) => state.trello.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoard(Number(board_id)))
      .then(() => {
        setProgressValue(100);
      })
      .catch(() => toast.warn(error));
  }, [activeModalCard, lists]);

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
    <>
      <nav>
        <Link to={`/`}>
          <button> На головну сторінку </button>
        </Link>
        <div>
          <input
            style={custom}
            id="color-board"
            className="color-board"
            type="color"
            value=""
            onChange={(event) =>
              dispatch(setColorBoard({ background: event?.target.value }))
            }
            onBlur={() => {
              putBoard(board_id, titleFromStore, custom);
            }}
          />
          <Link to={`/login`}>
            <button onClick={removeItemTokenStorage}> Вийти </button>
          </Link>
        </div>
      </nav>
      <div className="wrapper" style={custom}>
        {progressValue < 100 ? <ProgressBarNew value={progressValue} /> : null}
        <div className="header">
          <div className="title title-pacifico">
            <ReplaceTitle board_id={board_id} title={titleFromStore} />
          </div>
        </div>
        <div className="lists ">{listItems} </div>

        <AddFormList
          board_id={board_id}
          position={listItems.length}
          setLists={setLists}
        />
      </div>
    </>
  );
};
