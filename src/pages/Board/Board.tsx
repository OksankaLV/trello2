import React, { useEffect, useState } from 'react';
import { titleStart, listsStart } from '../../utils/data/Lists';
import { List } from './components/Lists/List';
import { Button } from './components/Button';
import './board.scss';
import { Link, useParams } from 'react-router-dom';
import { deleteBoard, getBoard, putBoard, req } from '../../utils/allRequests';
import { FormList } from './components/FormList/FormList';
import { ReplaceTitle } from './components/ReplaceTitle/ReplaceTitle';
import ProgressBar from '../ProgressBar/ProgressBar';
import {CardModal} from './components/CardModal/CardModal';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBoard } from '../../store/ActionCreator';
import IList from '../../common/interfaces/IList';


export const Board = function () {
  //const [title, setTitle] = useState(titleStart);
  const [lists, setLists] = useState(listsStart);
  //const [progressValue, setProgressValue] = useState(0);
 // const [error, setError] = useState('');
//const [activeCard, setActiveCard] = useState(false);
  const { board_id } = useParams();
  const { card_id } = useParams();
  const [onCardEdit, setOnCardEdit] = useState(false)


  
const activeModalCard = useAppSelector(state => state.trello.activeCard)
const listsFromStore = useAppSelector( state => state.trello.board.lists) ||[]
const titleFromStore = useAppSelector( state => state.trello.board.title)
const error = useAppSelector(state => state.trello.error)

const dispatch = useAppDispatch();


useEffect(() => {
    dispatch(fetchBoard(board_id))
    .then(()=>{       // setTitle(titleFromStore)
    }).catch((error) => toast.warn(error))
    /*getBoard(board_id)
      .then((data) => {
        setLists(data.lists);
    //    setTitle(data.title); })*/
        // .catch((error) => toast.warn(error.response.data.error));
  }, [activeModalCard]); 

  //req(setProgressValue);

  // useEffect(() => {
  //   if (error) {
  //     toast.warn(error, {
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'colored',
  //       transition: Bounce,
  //       closeOnClick: true,
  //     });
  //   }
  // }, [error]);

  document.title = titleFromStore;
  const listItems = listsFromStore.map((el:any,index:any) => (
    <List setLists={setLists} key={el.id} id={el.id} titleList={el.title} cards={el.cards} position={index}/>
  ));
  
  console.log(card_id)
 // if (card_id!==undefined) {activeModalCard=true}

  return (
    <div className="wrapper">
      <ToastContainer />
      {/* {progressValue < 100 ? <ProgressBar value={progressValue} max={100} /> : <></>} */}
      <div className="header">
        <Link to={`/`}>
          <Button name={'На головну сторінку'} />
        </Link>
        <div className="title">
          <ReplaceTitle board_id={board_id} title={titleFromStore} nameRequest={putBoard} />
        </div>
        <div>{board_id}</div>
      </div>
      <div className="lists">{listItems} </div>
      
      <AddFormList board_id={board_id} position={listItems.length} setLists={setLists}/>
      {/* <button onClick={()=>{newFunction()}}>test</button> */}
      {activeModalCard && <CardModal onCardEdit={onCardEdit} setCardEdit={setOnCardEdit} />}
    </div>
  );
};

interface IFormList {
  board_id: string | undefined;
  position: number;
  setLists: any;
}

function AddFormList({ board_id, position, setLists}: IFormList) {
  const [newListActive, setNewListActive] = useState(false);
  if (newListActive) {
    return <FormList active={newListActive} setActive={setNewListActive} id={board_id} position={position} setLists={setLists}/>;
  }
  return (
    <>
      <button className="listButton" onClick={() => setNewListActive(!newListActive)}>
        {' '}
        Додати новий список{' '}
      </button>
      <Link to="/">
        <button
          onClick={() => {
            deleteBoard(board_id);
            setNewListActive(false);
          }}
        >
          {' '}
          Видалити дошку{' '}
        </button>{' '}
      </Link>
    </>
  );
}



// function newFunction(){
//   alert('new')
//  //dispatch(activeCard())
// }


