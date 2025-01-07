import React, { useState } from "react";
import { getBoard, putList } from "../../../../api/allRequests";
import { validation } from "../../../../utils/validationText";
import "../ReplaceTitle/replaceTitle.scss";

interface ITitleList {
  board_id: string | undefined;
  list_id: number;
  titleList: string;
  position: number;
  setLists: React.Dispatch<object>;
}

export function ReplaceTitleList(props: ITitleList): JSX.Element {
  const [input, setInput] = useState(false);
  const [title, setTitle] = useState(props.titleList);

  const createTitle = function () {
    if (validation(title)) {
      putList(props.board_id, title, props.list_id, props.position)
        .then(() => getBoard(props.board_id))
        .then((data) => props.setLists(data.lists))
        .then(() => {
          setInput(false);
        });
    } else {
      setInput(true);
    }
  };
  return (
    <div>
      {input ? (
        <input
          type="text"
          value={title}
          autoFocus={true}
          onChange={(event) => setTitle(event?.target.value)}
          onKeyDown={(event) => {
            if (event?.key === "Enter") {
              createTitle();
            }
          }}
          onBlur={() => createTitle()}
        ></input>
      ) : (
        <p onClick={() => setInput(!input)}> {title}</p>
      )}
    </div>
  );
}
