import ICard from "../../../../common/interfaces/ICard";
import React, { useState } from "react";
import { getBoard, putCard } from "../../../../utils/allRequests";

export function Card({
  setLists,
  id,
  title,
  view,
  board_id,
  list_id,
}: ICard): React.JSX.Element {
  const [newTitle, setTitle] = useState(title);
  const idStr = id?.toString();

  function replaceCard() {
    putCard(board_id, id, newTitle, list_id)
      .then(() => getBoard(board_id))
      .then((data) => setLists(data.lists));
  }

  return view ? (
    <div draggable="false" id={idStr}>
      {" "}
      {title}{" "}
    </div>
  ) : (
    <div id={idStr}>
      <input
        type="text"
        placeholder={title}
        value={newTitle}
        onChange={(event) => setTitle(event?.target.value)}
        onKeyDown={(event) => {
          if (event?.key === "Enter") {
            replaceCard();
          }
        }}
        onBlur={() => replaceCard()}
      ></input>
    </div>
  );
}
