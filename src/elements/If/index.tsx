import React, { memo } from "react";

interface IIfProps {
  condition: boolean;
  children: JSX.Element | JSX.Element[] | any;
}

export const If: React.FC<IIfProps> = ({
  condition,
  children,
}): JSX.Element | any => {
  return condition ? children : null;
};

export default memo(If);
