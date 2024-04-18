import React, { useState, useEffect } from 'react';
import { Board } from '../Home/components/Board/Board';
import './home.scss';
import { Link } from 'react-router-dom';
import { getBoards } from '../../utils/allRequests';
import { FormBoard } from './components/FormBoard/FormBoard';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

const boards = [
  { id: 1, title: 'покупки', custom: { background: 'red' } },
  { id: 2, title: 'підготовка до весілля', custom: { background: 'green' } },
  { id: 3, title: 'розробка інтернет-магазину', custom: { background: 'blue' } },
  { id: 4, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
];

export function Home() : JSX.Element {
  const [boardData, setBoardData] = useState(boards);
  const [newBoardActive, setNewBoardActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [error, setError] = useState('');

  const list = boardData.map((el) => (
    <Link key={el.id} to={'board/' + el.id.toString()}>
      <Board key={el.id} title={el.title} custom={el.custom}></Board>
    </Link>
  ));

  useEffect(() => {
    setProgressValue(0);
    if (error) {
      toast.warn(error, {
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
        closeOnClick: true,
      });
    }
    getBoards(setProgressValue)
      .then((data) => {
        setBoardData(data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

  return (
    <section className="wrapper">
      <ToastContainer position="top-center" autoClose={5000} rtl={false} />
      {progressValue < 100 ? <ProgressBar value={progressValue} max={100} /> : <></>}
      <h1> Мої дошки </h1>
      <FormBoard active={newBoardActive} setActive={setNewBoardActive} />
      <div className="boardList">
        <div className="board" id="addBoard" onClick={() => setNewBoardActive(!newBoardActive)}>
          Додати дошку
        </div>
        {list}
      </div>
    </section>
  );
}
