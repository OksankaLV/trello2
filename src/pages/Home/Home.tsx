import React, { useState, useEffect } from "react";
import { BoardOnHome } from "./components/BoardOnHome/BoardOnHome";
import "./home.scss";
import { Link } from "react-router-dom";
import { getBoards } from "../../api/allRequests";
import { FormBoard } from "./components/FormBoard/FormBoard";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { fetchBoard } from "../../store/ActionCreator";
import ProgressBarNew from "../ProgressBar/ProgressBarNew";
import { removeItemTokenStorage } from "../../hooks/use-auth";

export function Home(): JSX.Element {
  const [boardData, setBoardData] = useState([]);
  const [newBoardActive, setNewBoardActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const dispatch = useAppDispatch();

  const list = boardData.map(
    (el: {
      id: React.Key | null | undefined | string;
      title: string;
      custom: string;
    }) => (
      <Link
        onClick={() => {
          dispatch(fetchBoard(el.id));
        }}
        key={el.id}
        to={`board/${el.id}`}
      >
        <BoardOnHome key={el.id} title={el.title} custom={el.custom} />
      </Link>
    )
  );

  async function setBoardOnHomeList() {
    try {
      const board = await getBoards();
      setBoardData(board);
      setProgressValue(100);
    } catch (e) {
      toast.warn("Щось пішло не так" + e);
    }
  }

  useEffect(() => {
    setBoardOnHomeList();
  }, [newBoardActive]);

  return (
    <section className="wrapper">
      {progressValue < 100 ? <ProgressBarNew value={progressValue} /> : null}
      <Link className="home-exit" to="/login" onClick={removeItemTokenStorage}>
        Вийти
      </Link>
      <h1 className="home-title title-pacifico"> Мої дошки </h1>
      <FormBoard active={newBoardActive} setActive={setNewBoardActive} />
      <div className="boardList">
        <div
          className="board"
          id="addBoard"
          onClick={() => setNewBoardActive(!newBoardActive)}
        >
          {!newBoardActive ? "Додати дошку" : "Відмінити"}
          <br />
          {newBoardActive && "+"}
        </div>
        {list}
      </div>
    </section>
  );
}
