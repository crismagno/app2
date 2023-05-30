import React, { memo } from "react";

interface IIfProps {
  condition: boolean;
  children: JSX.Element;
}

export const If: React.FC<IIfProps> = memo(({
  condition,
  children,
}): JSX.Element | null => (condition ? children : null));

export default If;
