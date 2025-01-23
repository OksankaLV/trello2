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
import { toast, Bounce, ToastContainer } from 'react-toastify';

/*interface ITitle{
  title: string,
  input: boolean,
  setInput: React.Dispatch<React.SetStateAction<boolean>>
}*/

export const Board = function () {
  const [title, setTitle] = useState(titleStart);
  const [lists, setLists] = useState(listsStart);
  const [progressValue, setProgressValue] = useState(0);
  const [error, setError] = useState('');

  const { board_id } = useParams();

  useEffect(() => {
    getBoard(board_id)
      .then((data) => {
        setLists(data.lists);
        setTitle(data.title);
      })
      .catch((error) => toast.warn(error.response.data.error));
  }, [error]); //// ПОКИ ПІД ПИТАННЯМ*/

  req(setProgressValue, setError);

  useEffect(() => {
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
  }, [error]);
  document.title = title;
  const listItems = lists.map((el) => (
    <List setLists={setLists} key={el.id} list_id={el.id} titleList={el.title} cards={el.cards} />
  ));

  return (
    <div className="wrapper">
      <ToastContainer />
      {progressValue < 100 ? <ProgressBar value={progressValue} max={100} /> : <></>}
      <div className="header">
        <Link to={`/trello2/`}>
          <Button name={'На головну сторінку'} />
        </Link>
        <div className="title">
          <ReplaceTitle board_id={board_id} title={title} setTitle={setTitle} nameRequest={putBoard} />
        </div>
        <div>{board_id}</div>
      </div>
      <div className="lists">{listItems} </div>
      <AddFormList board_id={board_id} />
    </div>
  );
};

interface IFormList {
  board_id: string | undefined;
}

function AddFormList({ board_id }: IFormList) {
  const [newListActive, setNewListActive] = useState(false);
  if (newListActive) {
    return <FormList active={newListActive} setActive={setNewListActive} id={board_id} />;
  }
  return (
    <>
      <button className="listButton" onClick={() => setNewListActive(!newListActive)}>
        {' '}
        Додати новий список{' '}
      </button>
      <Link to="/trello2/">
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
