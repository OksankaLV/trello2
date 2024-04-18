import './board.scss';
import IBoard from '../../../../common/interfaces/IBoard';
import React from 'react';

export function Board({ title, custom }: IBoard): JSX.Element {
  return (
    <div className="board" style={custom}>
      <div style={custom}> {title} </div>
    </div>
  );
}
