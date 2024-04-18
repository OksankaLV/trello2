import ICard from '../../../../common/interfaces/ICard';
import React from 'react';

export function Card({ id, title }: ICard): JSX.Element {
  const idStr = id?.toString();
  return <div id={idStr}> {title} </div>;
}
