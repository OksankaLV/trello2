import React, { useState, useEffect } from 'react';
import { Board } from '../Home/components/Board/Board';
import './home.scss';
import { Link } from 'react-router-dom';
import { getBoards } from '../../utils/allRequests';
import { FormBoard } from './components/FormBoard/FormBoard';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import { useAppDispatch } from '../../store/hooks';
import { deActiveCard } from '../../store/listSlice';
import { fetchBoard } from '../../store/ActionCreator';
import ProgressBarNew from '../ProgressBar/ProgressBarNew';


export function Home() : JSX.Element {
  const [boardData, setBoardData] = useState([]);
  const [newBoardActive, setNewBoardActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progress,setProgress] = useState(0)

  const dispatch = useAppDispatch();

  const list = boardData.map((el: { id: React.Key | null | undefined | string; title: string; custom: string;}) => (
    <Link onClick={()=>{dispatch(fetchBoard(el.id))}} key={el.id} to={`board/${el.id}`}> 
      <Board key={el.id} title={el.title} custom={el.custom}></Board>
    </Link>
  ));
 
  useEffect(() => {
    dispatch(deActiveCard());
    setProgressValue(0);
    getBoards(setProgressValue)
      .then((data) => {
        setBoardData(data);
      })
      .then(()=>(setProgress(100)))
      .catch((error) => {
        toast.warn(error.response.data.error);
      });
  },[]);

  return (
    <section className="wrapper">
      <ToastContainer position="top-center" autoClose={5000} rtl={false}
        pauseOnHover={true} draggable={true} theme={'colored'} transition={Bounce} closeOnClick={true}/>
      {progressValue < 100 ? <ProgressBar value={progressValue} max={100} /> : <></>}
      {progressValue < 100 ? <ProgressBarNew value={progress} /> : <></>}
      <h1> Мої дошки </h1>
      <FormBoard active={newBoardActive} setActive={setNewBoardActive} />
      <div className="boardList">
        <div className="board" id="addBoard" onClick={() => setNewBoardActive(!newBoardActive)}>
          Додати дошку
          <br></br>
          +
        </div>
        {list}
      </div>
    </section>
  );
}
