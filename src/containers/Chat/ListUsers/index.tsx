import React from "react";
import { Avatar } from "../../../components/Avatar";
import { IUserRoom } from "../functions/types";

interface IListUsersProps {
  usersRoom: IUserRoom[];
}

export const ListUsers: React.FC<IListUsersProps> = ({
  usersRoom,
}): JSX.Element => {
  return (
    <div
      className={`
        d-flex flex-column
        p-3
        col-lg-4 col-md-4 col-sm-2 col-12
      `}
    >
      <div>Users: {usersRoom.length}</div>
      {usersRoom.map((userRoom: IUserRoom, index: number): JSX.Element => {
        return (
          <div
            key={`users-room-${index}`}
            className={`
              border-bottom rounded-sm shadow
              d-flex items-center p-1 pb-2 mt-2
            `}
          >
            <Avatar src={userRoom.avatar} size={40} />
            <div
              className={`
						d-flex flex-column p-1
					`}
            >
              <span
                style={{ color: userRoom.userColor }}
                className={`text-sm`}
                title={`User name: ${userRoom.username}`}
              >
                {userRoom.username}
              </span>
              <span className={`text-xs`} title={`User id: ${userRoom.userId}`}>
                {userRoom.userId}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
