import { access } from 'fs/promises';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import './cardModal.scss';
import React, { useState } from 'react';
import { activeCard, deActiveCard } from '../../../../store/listSlice';
import { deleteCard, getBoard, putCard } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import { fetchBoard } from '../../../../store/ActionCreator';
import { CopyMoveModal } from '../CopyModal/CopyModal';
import { Link } from 'react-router-dom';

export const CardModal = (onCardEdit: any, setOnCardEdit: any): JSX.Element =>{
    const activeData = useAppSelector(state => state.trello.card) //{list_position, card_pos, board_Id}
    const listsData = useAppSelector(state => state.trello.board.lists)
    const listData = listsData[activeData.listPosition]
    //const cardData = listData

    const [titleCard, setTitleCard] = useState(listData.cards[activeData.cardPosition].title)//(cardData.card.title);
    const [titleList, setTitleList] = useState(listData.title);
    const [description, setDescription] = useState(listData.cards[activeData.cardPosition].description || 'description')
    const [copyMove, setCopyMove] = useState({copy: false, move: false})
    const dispatch = useAppDispatch();    
   
    function replaceCard(){
        putCard(activeData.board_id, listData.cards[activeData.cardPosition].id, titleCard, listData.id,  description)
        .then(()=>alert("Зміни збережено"))
            .then(() => dispatch(fetchBoard(activeData.board_id)))
            .then(()=>window.location.assign(`/#/board/${activeData.board_id}`))
        .catch((error)=>console.log(error))
      }

    function delCard(){
        deleteCard(activeData.board_id, listData.cards[activeData.cardPosition].id)
        .then(()=>dispatch(deActiveCard()))
            .then(() => alert("delete"))
            .then(() => dispatch(fetchBoard(activeData.board_id)))
            .then(()=>window.location.assign(`/#/board/${activeData.board_id}`))
        .catch((error)=>console.log(error))
    }

    

    function copyCard() {
        setCopyMove({copy: true, move: false})
    }

    function moveCard() {
        setCopyMove({copy: false, move: true})
    }

    return (
    <>
            <div className='wrapperModal'>
        <div className='bodyModal'>
        <div className='titleModal'>
            <h2>Картка: <span><input className='inputNone' type='text' value={titleCard} onChange={(e)=>{if (validation(e.target.value)){setTitleCard(e.target.value)}else{alert('error')}}}/></span></h2>
            <Link to={`/board/${activeData.board_id}`}><button type='button' onClick={()=>dispatch(deActiveCard())}> X </button></Link>
        </div>

        <div className='titleList'> 
            <p>На листу: <input className='inputNone' type='text' value={titleList} onChange={(e)=>{if (validation(e.target.value)){setTitleList(e.target.value)}else{alert('error')}}}/></p>
        </div>

        <div className='partModal'>
            <div className='leftPart'>
                <p> Учасники: </p>
                <div className='participants'>
                    <div className='li'>
                        <li> </li>
                        <li> </li>
                        <li> </li>
                        <li> </li></div>
                    <button> Приєднатися </button>
                </div>
                <div className='description'>
                    <p>Опис <button onClick={()=>replaceCard()}>Змінити</button> 
                    
                    <textarea className='inputNone' value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
                </div>

            </div>
            <div className='rightPart'>
                <p>Дії</p>
                <button onClick={()=>copyCard()}> Копіювати </button>
                <button onClick={()=>moveCard()}> Перемістити </button>
                <button onClick={()=>delCard()}> Видалити </button>
            </div>
        </div>
            {copyMove.copy && <CopyMoveModal titleCard={titleCard} description={description} setAction={setCopyMove} typyAction='Copy'/>}
            {copyMove.move && <CopyMoveModal titleCard={titleCard} description={description}setAction={setCopyMove} typyAction='Move'/>}
        </div>
    </div>
    </>
    ) 
}


