import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "./cardModal.scss";
import React, { useEffect, useState } from "react";
import {
  activeCard,
  deActiveCard,
  setError,
} from "../../../../store/listSlice";
import { deleteCard, getBoard, putCard } from "../../../../utils/allRequests";
import { validation } from "../../../../utils/validationText";
import { fetchBoard } from "../../../../store/ActionCreator";
import { CopyMoveModal } from "../CopyModal/CopyModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Board } from "../../Board";
import IList from "../../../../common/interfaces/IList";
import ICard from "../../../../common/interfaces/ICard";

export const CardModalId = (): React.JSX.Element => {
  const { board_id } = useParams();
  const { card_id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [listData, setListData] = useState({ title: "", lists: [] });

  const card = useAppSelector((state) => state.trello.card.card);
  const list_id = useAppSelector((state) => state.trello.card.list_id);
  const listsStore = useAppSelector((state) => state.trello.board.lists) || [];

  listsStore.map((lists: IList) => {
    lists.cards.map((element: ICard) => {
      if (element.id == card_id) {
        dispatch(activeCard({ card: element, list_id: lists.id }));
      }
    });
  });

  const [titleCard, setTitleCard] = useState("loading");
  const [description, setDescription] = useState("description");
  const [copyMove, setCopyMove] = useState({ copy: false, move: false });

  useEffect(() => {
    getBoard(board_id).then((data) => {
      setListData(data);
    });
  }, []);

  useEffect(() => {
    if (card !== undefined) {
      setTitleCard(card.title);
      setDescription(card.description);
    }
  }, [card]);

  function replaceCard() {
    putCard(board_id, Number(card_id), titleCard, list_id, description)
      .then(() => alert("Зміни збережено"))
      .then(() => dispatch(fetchBoard(board_id)))
      .then(() => navigate(-1))
      .catch((error) => dispatch(setError(error)));
  }

  function delCard() {
    deleteCard(board_id, card_id)
      .then(() => dispatch(deActiveCard()))
      .then(() => alert("delete"))
      .then(() => dispatch(fetchBoard(board_id)))
      .then(() => navigate(-1))
      .catch((error) => dispatch(setError(error)));
  }

  function copyCard() {
    setCopyMove({ copy: true, move: false });
  }

  function moveCard() {
    setCopyMove({ copy: false, move: true });
  }

  return (
    <>
      <Board />
      <div className="wrapperModal">
        <div className="bodyModal">
          <div className="titleModal">
            <h2>
              Картка:{" "}
              <span>
                <input
                  className="inputNone"
                  type="textarea"
                  value={titleCard}
                  onChange={(e) => {
                    if (validation(e.target.value)) {
                      setTitleCard(e.target.value);
                    } else {
                      alert("error");
                    }
                  }}
                />
              </span>
            </h2>
            <Link to={`/board/${board_id}`}>
              <button type="button" onClick={() => dispatch(deActiveCard())}>
                {" "}
                X{" "}
              </button>
            </Link>
          </div>

          <div className="titleList">
            <p>На листу: {listData.title} </p>
          </div>

          <div className="partModal">
            <div className="leftPart">
              <p> Учасники: </p>
              <div className="participants">
                <div className="li">
                  <li> </li>
                  <li> </li>
                  <li> </li>
                  <li> </li>
                </div>
                <button> Приєднатися </button>
              </div>
              <div className="description">
                <p>
                  Опис <button onClick={() => replaceCard()}>Змінити</button>
                  <textarea
                    className="inputNone"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </p>
              </div>
            </div>
            <div className="rightPart">
              <p>Дії</p>
              <button onClick={() => copyCard()}> Копіювати </button>
              <button onClick={() => moveCard()}> Перемістити </button>
              <button onClick={() => delCard()}> Видалити </button>
            </div>
          </div>
          {copyMove.copy && (
            <CopyMoveModal
              titleCard={titleCard}
              description={description}
              setAction={setCopyMove}
              typyAction="Copy"
            />
          )}
          {copyMove.move && (
            <CopyMoveModal
              titleCard={titleCard}
              description={description}
              setAction={setCopyMove}
              typyAction="Move"
            />
          )}
        </div>
      </div>
    </>
  );
};
