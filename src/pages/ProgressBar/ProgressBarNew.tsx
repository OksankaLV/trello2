import React, { useState } from "react";
import "./progressBar.scss";

interface IProgressBar {
  value: number;
}
const MAX = 100;
const PROGRESS = 5; //step for visualize progress

const ProgressBar = ({ value }: IProgressBar) => {
  const [progressValue, setProgressValue] = useState(0);
  if (value < 100) {
    if (progressValue < MAX) {
      setTimeout(() => setProgressValue(progressValue + PROGRESS), 100);
    } else {
      setProgressValue(progressValue - 2 * PROGRESS);
    }
  }
  return <progress className="progressBar" value={progressValue} max={MAX} />;
};

export default ProgressBar;
