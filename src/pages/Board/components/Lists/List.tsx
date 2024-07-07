import ICard from '../../../../common/interfaces/ICard';
import { Card } from '../Card/Card';
import { Button } from '../Button';
import './list.scss';
import IList from '../../../../common/interfaces/IList';
import React, { useEffect, useState } from 'react';
import { FormCard } from '../FormCard/FormCard';
import { useParams } from 'react-router-dom';
import { deleteCard, deleteList, getBoard, putCards} from '../../../../utils/allRequests';
import { ReplaceTitleList } from '../ReplaceTitleList/ReplaceTitleList';
import { eventNames } from 'process';
import { error } from 'console';


export function List({ setLists, titleList, cards, id, position }: IList): JSX.Element {
  const { board_id } = useParams();
  const [activeCard, setActiveCard] = useState(false);
  const [viewCard, setViewCard] = useState(Array(cards.length).fill(true))


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
    deleteList(board_id, id)
      .then(() => getBoard(board_id))
      .then((data) => setLists(data.lists))
      .then(() => alert(`${id}} element deleted`));
  }

  function putCard(index:number){
    const newViewCard=viewCard.map((v,i)=>{
      if (i==index){return !v} else { return v}
    })
    return setViewCard(newViewCard)
  }

  
  useEffect(()=>{
    const dragElements = document.querySelectorAll('div[draggable="true"]');
    const dropElements = document.querySelectorAll('.listItems');

    dragElements.forEach(()=>addEventListener("dragstart", onDragStart));
    dragElements.forEach(()=>addEventListener("dragleave", onDragLeave));
    dragElements.forEach(()=>addEventListener("dragenter", onDragEnter));

    dropElements.forEach(()=>addEventListener("dragover",(event)=>{
      event.preventDefault();
    }))
    dropElements.forEach(()=>addEventListener("drop",onDrop));
  }
  )

  function onDragStart(ev:any){
    if(ev.target.className!="drag"){
    const div = document.createElement("div");
    div.className = "noActive"
    ev.target.className = "drag"
    const el = document.querySelector(".drag")
    el?.insertAdjacentElement('afterend', div)
  }
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }

  function onDragLeave(ev:any){
    ev.preventDefault();
    document.querySelector('.noActive')?.remove();
  }

  function onDragEnter(ev: any){
    ev.preventDefault();
    if (ev.target.classList=="listItems"){
      const element = getPosition(ev.target, ev.clientY)
      if(ev.target.querySelector('.newActive') && ev.target.querySelector('.newActive')!==element){
        ev.target.querySelector('.newActive').remove()
    
      }
      if(!ev.target.querySelector('.newActive')){
      const div = document.createElement("div");
      div.className = "newActive"
      if (element!==null){
        element.insertAdjacentElement('afterend', div)
      } else {
        ev.target.insertBefore(div, ev.target.lastChild)
      }

    }
    
  }
  }

  function onDrop(ev:any){
    ev.preventDefault();
    
    const data = ev.dataTransfer.getData("text/plain");
    const el= document.getElementById(data);
    const elOld = document.querySelector('.newActive')
    
    if (el && elOld?.parentElement){
      elOld.parentElement.insertBefore(el, elOld)
      console.log("put2")
      const newlist = el?.parentElement?.parentElement;
    if (newlist){
     putCards(board_id, +data , position, +newlist?.id).then(()=>alert("+")).catch(()=>console.log("error"))  
    }
    }
  
    document.querySelector('.newActive')?.remove();
    document.querySelector('.drag')?.classList.remove('drag')
    
  }

  function getPosition(container:any, y: any) {
  const dragEls = [ ...container.querySelectorAll(".listItems div[draggable=true]:not(.drag)")];

  for (const drag of dragEls){
    const pos = drag.getBoundingClientRect();
    if (y<pos.bottom){
      return drag;
    }
  }
  return null;
  }



  const cardsItem = cards.map((el,index) => (
    <div key={el.id} draggable="true" id={el.id}>
      <Card setLists={setLists} key={el.id} id={el.id} title={el.title} view={viewCard[index]} board_id={board_id} list_id={id}/>
      <span onClick={() => putCard(index)}> 🖊️ </span> 
      <span onClick={() => delCard(el)}> ❌ </span>
    </div>
  ));
  const card_id = cards.length;

  return (
    <div className="list" id={id+""}>
      <h2 className="titleList">
        <ReplaceTitleList board_id={board_id} titleList={titleList} list_id={id} position={position} setLists={setLists} />
      </h2>
      <div className="listItems">{cardsItem} </div>
      <FormCard active={activeCard} setActive={setActiveCard} board_id={board_id} list_id={id} id={card_id} setLists={setLists}/>
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
