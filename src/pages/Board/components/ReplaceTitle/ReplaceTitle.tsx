import React, { useState } from "react";
import { validation } from "../../../../utils/validationText";
import "./replaceTitle.scss";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchBoard } from "../../../../store/ActionCreator";

interface ITitle {
  board_id: string | undefined;
  title: string;
  id?: number;
  position?: number;
  nameRequest: any;
}
export function ReplaceTitle(props: ITitle): React.JSX.Element {
  const [input, setInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const dispatch = useAppDispatch();

  const createTitle = function () {
    if (validation(titleInput)) {
      props
        .nameRequest(props.board_id, titleInput, props.id, props.position)
        .then(() => dispatch(fetchBoard(props.board_id)));
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
          value={titleInput}
          placeholder={props.title}
          onChange={(event) => setTitleInput(event?.target.value)}
          onKeyDown={(event) => {
            if (event?.key === "Enter") {
              createTitle();
            }
          }}
          onBlur={() => createTitle()}
        ></input>
      ) : (
        <p onClick={() => setInput(!input)}> {props.title}</p>
      )}
    </div>
  );
}
