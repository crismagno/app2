import React, { memo } from "react";

export const If: React.FC<{ condition: boolean }> = ({
  condition,
  children,
}): JSX.Element | any => {
  return condition ? children : null;
};

export default memo(If);
