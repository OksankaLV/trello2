import React, { useState } from 'react';
import { getBoard, putList } from '../../../../utils/allRequests';
import { validation } from '../../../../utils/validationText';
import '../ReplaceTitle/replaceTitle.scss';

interface ITitleList {
    board_id: string|undefined;
    list_id: number;
    titleList: string;
   // setTitleList: React.Dispatch<React.SetStateAction<string>>;
    position: number;
    setLists: React.Dispatch<object>;
  }

export function ReplaceTitleList(props: ITitleList): JSX.Element {
  const [input, setInput] = useState(false);
  const [title, setTitle] = useState(props.titleList)

  const createTitle = function () {
    if (validation(props.titleList)) {
        putList(props.board_id, props.titleList, props.list_id, props.position)
        .then(()=>alert(`title updated`))
        .then(() => getBoard(props.board_id))
        .then((data)=>props.setLists(data.lists))
        .then((data: any) => {
//props.setTitleList(data.titleList);
          
          setInput(false);
        });
    } else {
    //  props.setTitleList(props.titleList);
      setInput(true);
    }
  };
  return (
    <div>
      {input ? (
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event?.target.value)}
          onKeyDown={(event) => {
            if (event?.key === 'Enter') {
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
