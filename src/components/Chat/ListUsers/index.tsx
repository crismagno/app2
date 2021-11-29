import React from "react";
import Image from "next/image";
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
            {userRoom.avatar ? (
              <img
                src={
                  userRoom.avatar || "https://picsum.photos/200/300?random=2"
                }
                alt={"avatar user"}
                className={`border-2 rounded-full mr-1 shadow`}
                style={{ width: 40, height: 40, borderColor: "#FFF6" }}
              />
            ) : (
              <div
                className={`
								d-flex justify-center items-center 
								border rounded-full 
								w-10 h-10 text-blue-600 bg-gray-200 mr-1 shadow
							`}
              >
                <i className={`fa fa-user-astronaut text-2xl`} />
              </div>
            )}
            <div
              className={`
						d-flex flex-column p-1
					`}
            >
              <span
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
