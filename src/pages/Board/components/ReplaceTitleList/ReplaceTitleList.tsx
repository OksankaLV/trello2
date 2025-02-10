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

  const { titleList, board_id, list_id, position, setLists } = props;

  const [input, setInput] = useState(false);
  const [title, setTitle] = useState(titleList);

  const createTitle = async function () {
    if (validation(title)) {
      await putList(board_id, title, list_id, position)
      const boardData = await getBoard(board_id)
      setLists(boardData.lists)
      setInput(false);
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
          onBlur={createTitle}
        ></input>
      ) : (
        <p onClick={() => setInput(!input)}> {title}</p>
      )}
    </div>
  );
}
