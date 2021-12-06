import React from "react";
import { Animated, AnimationString } from "react-animated-css";

const avatarDefault =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

export const Avatar: React.FC<{
  src: string;
  size?: number;
  animation?: AnimationString;
}> = ({ src, size = 50, animation = "fadeIn" }): JSX.Element => {
  const styleAvatar: React.CSSProperties = {
    width: size,
    height: size,
    borderColor: "#FFF5",
    objectFit: "cover",
  };

  return (
    <Animated
      animationIn={animation}
      animationOut="fadeOut"
      animationInDelay={100}
      animationInDuration={400}
      isVisible={true}
    >
      {src ? (
        <object
          data={src}
          type="image/png"
          style={styleAvatar}
          className={`border-1 rounded-full mr-1 shadow`}
        >
          <img
            src={avatarDefault}
            alt={"user avatar"}
            className={`border-1 rounded-full mr-1 shadow`}
            style={styleAvatar}
          />
        </object>
      ) : (
        <div
          className={`
				d-flex justify-center items-center 
				border rounded-full 
				w-10 h-10 text-blue-600 bg-gray-200 mr-1 shadow
			`}
          style={{ width: size, height: size }}
        >
          <i
            className={`fa fa-user-astronaut text-2xl`}
            style={{ fontSize: size / 1.9 }}
          />
        </div>
      )}
    </Animated>
  );
};
