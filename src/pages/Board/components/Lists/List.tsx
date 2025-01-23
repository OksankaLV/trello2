import ICard from '../../../../common/interfaces/ICard';
import { Card } from '../Card/Card';
import { Button } from '../Button';
import './list.scss';
import IList from '../../../../common/interfaces/IList';
import React, { useEffect, useState } from 'react';
import { FormCard } from '../FormCard/FormCard';
import { useParams } from 'react-router-dom';
import { deleteCard, deleteList, getBoard, putList } from '../../../../utils/allRequests';
import { ReplaceTitle } from '../ReplaceTitle/ReplaceTitle';

export function List({ setLists, titleList, cards, list_id }: IList): JSX.Element {
  const { board_id } = useParams();
  const [activeCard, setActiveCard] = useState(false);
  const [title, setTitle] = useState(titleList);

  function addCard() {
    setActiveCard(!activeCard);
  }

  //useEffect(() => {}, []); // cards, activeCard

  function delCard(el: ICard) {
    deleteCard(board_id, el.id)
      .then(() => getBoard(board_id))
      .then((data) => setLists(data.lists))
      .then(() => alert(`${el.title} element deleted`));
  }
  function delList() {
    deleteList(board_id, list_id)
      .then(() => getBoard(board_id))
      .then((data) => setLists(data.lists))
      .then(() => alert(`${list_id}} element deleted`));
  }

  const cardsItem = cards.map((el) => (
    <div key={el.id}>
      <Card key={el.id} id={el.id} title={el.title} />
      <span onClick={() => delCard(el)}> ❌ </span>
    </div>
  ));
  const card_id = cards.length;

  return (
    <div className="list">
      <h2 className="titleList">
        {' '}
        {/*title*/}
        <ReplaceTitle board_id={board_id} title={title} setTitle={setTitle} id={list_id} nameRequest={putList} />
      </h2>
      <div className="listItems">{cardsItem} </div>
      <FormCard active={activeCard} setActive={setActiveCard} board_id={board_id} list_id={list_id} id={card_id} />
      {!activeCard ? (
        <div className="buttonsList">
          <div onClick={addCard}>
            <Button name={'Add card'} />
          </div>
          <div onClick={delList}>
            <Button name={'❌ list'} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
