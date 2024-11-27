import ICard from "../../../../common/interfaces/ICard";
import { Card } from "../Card/Card";
import "./list.scss";
import IList from "../../../../common/interfaces/IList";
import React, { useEffect, useState } from "react";
import { FormCard } from "../FormCard/FormCard";
import { Link, useParams } from "react-router-dom";
import { deleteCard, deleteList, getBoard } from "../../../../api/allRequests";
import { ReplaceTitleList } from "../ReplaceTitleList/ReplaceTitleList";
import { useAppDispatch } from "../../../../store/hooks";
import { activeCard } from "../../../../store/listSlice";
import { dragAndDrop } from "../../../../common/dragAndDrop";

export function List({
  setLists,
  titleList,
  cards,
  id,
  position,
}: IList): React.JSX.Element {
  const { board_id } = useParams();
  const [activeCardOne, setActiveCard] = useState(false);

  function addCard() {
    setActiveCard(!activeCardOne);
  }

  function delCard(el: ICard) {
    deleteCard(board_id, el.id)
      .then(() => getBoard(board_id))
      .then((data) => setLists(data.lists));
  }
  function delList() {
    deleteList(board_id, id)
      .then(() => getBoard(board_id))
      .then((data) => setLists(data.lists));
  }

  useEffect(() => {
    dragAndDrop(board_id, position);
  });
  const dispatch = useAppDispatch();

  const cardsItem = cards.map((el) => (
    <div key={el.id} draggable="true" id={el.id}>
      <Link
        draggable="false"
        to={`./card/${el.id}`}
        onClick={() => dispatch(activeCard({ card: el, list_id: id }))}
      >
        <Card
          setLists={setLists}
          key={el.id}
          id={el.id}
          title={el.title + "-" + el.position}
          view={true}
          board_id={board_id}
          list_id={id}
        />
      </Link>
      <span onClick={() => delCard(el)}> ❌ </span>
    </div>
  ));
  const card_id = cards.length;

  return (
    <div className="list" id={id + ""}>
      <h2 className="titleList">
        <ReplaceTitleList
          board_id={board_id}
          titleList={titleList}
          list_id={id}
          position={position}
          setLists={setLists}
        />
      </h2>

      <div className="listItems">{cardsItem} </div>
      <FormCard
        active={activeCardOne}
        setActive={setActiveCard}
        board_id={board_id}
        list_id={id}
        id={card_id}
        setLists={setLists}
      />
      {!activeCardOne ? (
        <div className="buttonsList">
          <div onClick={addCard}>
            <button>Додати картку</button>
          </div>
          <div onClick={delList}>
            <button> Видалити картку ❌ </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
