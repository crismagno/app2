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
        return "bg-gradient-to-tr from-white to-gray-50 text-gray-800";
      case EColorChoose.warning:
        return "bg-gradient-to-tr from-yellow-400 to-yellow-500 text-white";
      case EColorChoose.danger:
        return "bg-gradient-to-tr from-red-400 to-red-500 text-white";
      case EColorChoose.success:
        return "bg-gradient-to-tr from-green-500 to-green-700 text-white";
      case EColorChoose.dark:
        return "bg-gradient-to-tr from-gray-800 to-gray-900 text-white";
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
