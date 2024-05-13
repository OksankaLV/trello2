import React, { useState } from 'react';
import { getBoard } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import './replaceTitle.scss';

interface ITitle {
  board_id: string | undefined;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  //input: boolean;
  //setInput: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
  position?: number;
  nameRequest: any;
}
export function ReplaceTitle(props: ITitle): JSX.Element {
  const [input, setInput] = useState(false);
  const createTitle = function () {
    if (validation(props.title)) {
      props
        .nameRequest(props.board_id, props.title, props.id, props.position)
        .then(() => getBoard(props.board_id))
        .then((data: any) => {
          setInput(false);
          props.setTitle(data.title);
        });
    } else {
      props.setTitle(props.title);
      setInput(true);
    }
  };
  return (
    <div>
      {input ? (
        <input
          type="text"
          value={props.title}
          onChange={(event) => props.setTitle(event?.target.value)}
          onKeyDown={(event) => {
            if (event?.key === 'Enter') {
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
