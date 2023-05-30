import { memo } from "react";
import { Animated, AnimationString } from "react-animated-css";

export enum EColorChoose {
  "white",
  "warning",
  "danger",
  "success",
  "dark",
}

export interface IWormBoxProps {
  className?: string;
  text?: string | number;
  icon?: JSX.Element;
  colorChoose?: EColorChoose;
  animationIn?: AnimationString;
  animationOut?: AnimationString;
  show?: boolean;
}

export const WormBox: React.FC<IWormBoxProps> = ({
  animationIn = "fadeIn",
  animationOut = "fadeOut",
  className,
  colorChoose,
  icon,
  show,
  text,
}): JSX.Element => {
  const styleChoose = () => {
    switch (colorChoose) {
      case EColorChoose.white:
        return "bg-white text-dark";
      case EColorChoose.warning:
        return "bg-warning text-white";
      case EColorChoose.danger:
        return "bg-danger text-white";
      case EColorChoose.success:
        return "bg-success text-white";
      case EColorChoose.dark:
        return "bg-dark text-white";
    }
  };

  return (
    <Animated
      animationIn={animationIn}
      animationOut={animationOut}
      isVisible={show}
      className={`
        flex justify-start items-center px-4 py-2
        min-h-0 w-96 max-h-96
        ${styleChoose()}
        text-base
        z-10
        rounded-md
        shadow-2xl
        ${className}
      `}
    >
      <span className={`mr-4`}>{icon}</span>
      <span>{text}</span>
    </Animated>
  );
};

export default memo(WormBox);
