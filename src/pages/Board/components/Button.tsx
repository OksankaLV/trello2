import React from "react";

interface IButton {
  name: string;
  className?: string;
  onclick?: () => object;
}

export const Button = ({ name, className, onclick }: IButton): JSX.Element => (
  <button type="button" className={className} onClick={onclick}>
    {' '}
    {name}{' '}
  </button>
);
