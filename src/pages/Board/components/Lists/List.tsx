import ICard from '../../../../common/interfaces/ICard';
import { Card } from '../Card/Card';
import { Button } from '../Button';
import './list.scss';
import IList from '../../../../common/interfaces/IList';
import React, { useState } from 'react';
import { FormCard } from '../FormCard/FormCard';
import { useParams } from 'react-router-dom';
import { deleteCard, deleteList, getBoard, putLists } from '../../../../utils/allRequests';
import { ReplaceTitleList } from '../ReplaceTitleList/ReplaceTitleList';


export function List({ setLists, titleList, cards, list_id, position }: IList): JSX.Element {
  const { board_id } = useParams();
  const [activeCard, setActiveCard] = useState(false);
  const [viewCard, setViewCard] = useState(true)

  function addCard() {
    setActiveCard(!activeCard);
  }
  
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

  function putCard(el:ICard){
    setViewCard(false)
  }

  const cardsItem = cards.map((el) => (
    <div key={el.id}>
      <Card key={el.id} id={el.id} title={el.title} view={viewCard}/>
      <span onClick={() => putCard(el)}> 🖊️ </span> 
      <span onClick={() => delCard(el)}> ❌ </span>
    </div>
  ));
  const card_id = cards.length;

  return (
    <div className="list">
      <h2 className="titleList">
        <ReplaceTitleList board_id={board_id} titleList={titleList} list_id={list_id} position={position} setLists={setLists} />
      </h2>
      <div className="listItems">{cardsItem} </div>
      <FormCard active={activeCard} setActive={setActiveCard} board_id={board_id} list_id={list_id} id={card_id} setLists={setLists}/>
      {!activeCard ? (
        <div className="buttonsList">
          <div onClick={addCard}>
            <Button name={'Додати картку'} />
          </div>
          <div onClick={delList}>
            <Button name={'❌'} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
