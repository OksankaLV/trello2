import React, { useState } from "react";
import { validation } from "../../../../utils/validationText";
import "./replaceTitle.scss";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchBoard } from "../../../../store/ActionCreator";
import { putBoard } from "../../../../api/allRequests";

interface ITitle {
  board_id: string | undefined;
  title: string;
  custom?: object;
  id?: number;
  position?: number;
}
export function ReplaceTitle(props: ITitle): React.JSX.Element {
  const [input, setInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const {board_id, title} = props;

  const dispatch = useAppDispatch();

  const createTitle = async function () {
    if (validation(titleInput)) {
      await putBoard(board_id, titleInput)
      dispatch(fetchBoard(board_id)
      );
      setInput(false);
    } else {
      setInput(false);
    }
  };
  return (
    <div>
      {input ? (
        <input
          type="text"
          autoFocus={true}
          className="title__input"
          value={titleInput}
          placeholder={title}
          onChange={(event) => setTitleInput(event?.target.value)}
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
