import React, { useState, useEffect } from "react";
import { BoardOnHome } from "./components/BoardOnHome/BoardOnHome";
import "./home.scss";
import { Link } from "react-router-dom";
import { getBoards } from "../../api/allRequests";
import { FormBoard } from "./components/FormBoard/FormBoard";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { fetchBoard } from "../../store/ActionCreator";
import ProgressBarNew from "../ProgressBar/ProgressBarNew";
import { removeItemTokenStorage, useAuth } from "../../hooks/use-auth";
import Login from "../Login/Login";

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
        <BoardOnHome
          key={el.id}
          title={el.title}
          custom={el.custom}
        ></BoardOnHome>
      </Link>
    )
  );

  useEffect(() => {
    if (useAuth().token) {
      getBoards(setProgressValue)
        .then((data) => {
          setBoardData(data);
        })
        .catch((error) => {
          toast.warn(error.response.data.error);
        });
    }
  }, []);

  return useAuth().token ? (
    <section className="wrapper">
      {/* {useAuth().token == undefined && <Navigate replace to="/login" />} */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        rtl={false}
        pauseOnHover={true}
        draggable={true}
        theme={"colored"}
        transition={Bounce}
        closeOnClick={true}
      />
      {progressValue < 100 ? <ProgressBarNew value={progressValue} /> : <></>}
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
          <br></br>
          {!newBoardActive ? "+" : " "}
        </div>
        {list}
      </div>
    </section>
  ) : (
    <Login />
  );
}
