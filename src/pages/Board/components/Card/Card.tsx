import ICard from '../../../../common/interfaces/ICard';
import React from 'react';
import { putCard } from '../../../../utils/allRequests';
import { Value } from 'sass';

export function Card({ id, title, view}: ICard): JSX.Element {
  const idStr = id?.toString();
  return (
    view? 
    <div id={idStr}> {title} </div>: 
    <div id={idStr}>
    <input
        type="text"
        placeholder={title}
        onKeyDown={(event) => {
          if (event?.key === 'Enter') {
            alert(+"Зробити запит на зміну картки");
          }
        }}
        onBlur={() => alert("Зробити запит на зміну картки")}
      ></input>
    </div>)
}
