import React from 'react';
import './progressBar.scss';

interface IProgressBar {
  value: number;
  max: number | 100;
}

const ProgressBar = ({ value, max }: IProgressBar) => {
  return <progress className="progressBar" value={value} max={max} />;
};

export default ProgressBar;
