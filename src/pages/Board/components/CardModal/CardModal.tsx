import { access } from 'fs/promises';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import './cardModal.scss';
import React, { useEffect, useState } from 'react';
import { activeCard, deActiveCard } from '../../../../store/listSlice';
import { deleteCard, getBoard, putCard } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import { fetchBoard } from '../../../../store/ActionCreator';
import { CopyMoveModal } from '../CopyModal/CopyModal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { title } from 'process';
import { Board } from '../../Board';

export const CardModal = (): JSX.Element => {
     
    const { board_id } = useParams();
    const { card_id } = useParams();
    const { list_pos } = useParams();
    const {card_pos} = useParams()

//      useEffect(() => {
//         dispatch(fetchBoard(board_id))
//             .then(() => dispatch(activeCard({ listPosition: list_pos, cardPosition: card_pos, board_id: board_id }))
//          )
//      }, [])
    
//     const activeData = useAppSelector(state => state.trello.card) // state consist of {list_position, card_pos, board_Id}
//     const listsData = useAppSelector(state => state.trello.board.lists)
//     const listData = listsData[activeData.listPosition]
//     const cardData = listData.cards[activeData.cardPosition]
    
//     console.log(listsData)
//     console.log(listData)
//     console.log(listData.cards[Number(card_pos)])

//     const [titleCard, setTitleCard] = useState(cardData.title)//(cardData.card.title);
//     const [description, setDescription] = useState(cardData.description ) 
//     const [copyMove, setCopyMove] = useState({copy: false, move: false})
//     const dispatch = useAppDispatch();    
//     const navigate = useNavigate();

// console.log(titleCard)

// console.log(description)

// console.log(listData)

   

//     function replaceCard(){
//         putCard(activeData.board_id, listData.cards[activeData.cardPosition].id, titleCard, listData.id,  description)
//         .then(()=>alert("Зміни збережено"))
//             .then(() => dispatch(fetchBoard(activeData.board_id)))
//             .then(()=>navigate(-1))
//             // .then(()=>window.location.assign(`/#/board/${activeData.board_id}`))
//         .catch((error)=>console.log(error))
//       }

//     function delCard(){
//         deleteCard(activeData.board_id, listData.cards[activeData.cardPosition].id)
//         .then(()=>dispatch(deActiveCard()))
//             .then(() => alert("delete"))
//             .then(() => dispatch(fetchBoard(activeData.board_id)))
//             .then(()=>navigate(-1))
//             // .then(()=>window.location.assign(`/#/board/${activeData.board_id}`))
//         .catch((error)=>console.log(error))
//     }

    

//     function copyCard() {
//         setCopyMove({copy: true, move: false})
//     }

//     function moveCard() {
//         setCopyMove({copy: false, move: true})
//     }

    return (
        <>
{/* //             <Board /> */}
{/* //          <div className='wrapperModal'>
//                 <div className='bodyModal'>
//                     <div className='titleModal'>
//                         <h2>Картка: <span><input className='inputNone' type='textarea' value={titleCard} onChange={(e) => { if (validation(e.target.value)) { setTitleCard(e.target.value) } else { alert('error') } }} /></span></h2>
//                         <Link to={`/board/${activeData.board_id}`}><button type='button' onClick={() => dispatch(deActiveCard())}> X </button></Link>
//                     </div>

//                     <div className='titleList'>
//                         <p>На листу: {listData.title} </p>
//                     </div>

//                     <div className='partModal'>
//                         <div className='leftPart'>
//                             <p> Учасники: </p>
//                             <div className='participants'>
//                                 <div className='li'>
//                                     <li> </li>
//                                     <li> </li>
//                                     <li> </li>
//                                     <li> </li></div>
//                                 <button> Приєднатися </button>
//                             </div>
//                             <div className='description'>
//                                 <p>Опис <button onClick={() => replaceCard()}>Змінити</button>
                    
//                                     <textarea className='inputNone' value={description} onChange={(e) => setDescription(e.target.value)} /></p>
//                             </div>

//                         </div>
//                         <div className='rightPart'>
//                             <p>Дії</p>
//                             <button onClick={() => copyCard()}> Копіювати </button>
//                             <button onClick={() => moveCard()}> Перемістити </button>
//                             <button onClick={() => delCard()}> Видалити </button>
//                         </div>
//                     </div>
//                     {copyMove.copy && <CopyMoveModal titleCard={titleCard} description={description} setAction={setCopyMove} typyAction='Copy' />}
//                     {copyMove.move && <CopyMoveModal titleCard={titleCard} description={description} setAction={setCopyMove} typyAction='Move' />}
//                 </div>
//             </div> */}
    </>
    ) 
}


