import React, { memo, useState } from "react";
import Avatar from "../../../components/Avatar";
import { IUserRoom } from "../functions/types";

interface IListUsersProps {
  usersRoom: IUserRoom[];
}

export const ListUsers: React.FC<IListUsersProps> = ({
  usersRoom,
}): JSX.Element => {
  const [toggleClasses, setToggleClasses] = useState(false);

  // const styleHide = `sm:fixed top-0 left-0 d-flex d-sm-flex z-40`;

  return (
    <>
      <div className="d-flex d-sm-flex d-md-none sm:absolute absolute -left-3 z-10">
        <button
          className="btn btn-primary btn-sm opacity-30 hover:opacity-100"
          onClick={() => setToggleClasses(!toggleClasses)}
        >
          <i className="fa fa-users" />
        </button>
      </div>
      <div
        className={`
        d-md-flex flex-column p-3
        col-lg-4 col-md-4 col-12
        md:relative sm:absolute absolute
        ${toggleClasses ? "sm:-left-full -left-full" : "sm:left-0 left-0"}
        md:-left-0
        lg:-left-0 
        -left-0
        z-10
        bg-gradient-to-tr from-gray-800 to-gray-900
        shadow-lg
        h-full
      `}
      >
        <div className="flex justify-between">
          <span>Users: {usersRoom.length}</span>
          <button
            className="btn btn-secondary btn-sm d-sm-flex d-md-none"
            onClick={() => setToggleClasses(!toggleClasses)}
          >
            <i className="fa fa-times" />
          </button>
        </div>
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
                <span
                  className={`text-xs`}
                  title={`User id: ${userRoom.userId}`}
                >
                  {userRoom.userId}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default memo(ListUsers);
