import "./boardOnHome.scss";
import IBoard from "../../../../common/interfaces/IBoard";
import React from "react";

export function BoardOnHome({ title, custom }: IBoard): React.JSX.Element {
  return (
    <div className="board" style={custom}>
      <div style={custom}> {title} </div>
    </div>
  );
}
