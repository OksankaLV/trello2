import React from "react";

const ValidationProgress = ({ valueProgress }: { valueProgress: number }) => {
  const colorProgress = () => {
    switch (valueProgress) {
      case 1:
        return ["orange", "red", "red", "red"];
      case 2:
        return ["green", "orange", "red", "red"];
      case 3:
        return ["green", "green", "orange", "red"];
      case 4:
        return ["green", "green", "green", "orange"];
      case 5:
        return ["green", "green", "green", "green"];
      default:
        return ["red", "red", "red", "red"];
    }
  };
  const color = colorProgress();

  return valueProgress !== 6 ? (
    <div className="passEnter">
      <div id="passOne" style={{ background: color[0] }}></div>
      <div id="passTwo" style={{ background: color[1] }}></div>
      <div id="passThree" style={{ background: color[2] }}></div>
      <div id="passFour" style={{ background: color[3] }}></div>
    </div>
  ) : (
    <></>
  );
};

export default ValidationProgress;
