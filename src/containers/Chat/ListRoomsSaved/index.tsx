import router from "next/router";
import React, { memo, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import { ELocalStorageItem } from "../../../shared/rooms-saved/enum";
import { IRoomSaved } from "../../../shared/rooms-saved/types";
import { ETypeChatLabels } from "../../../utils/interfaces";
import { IUserRoom } from "../functions/types";

export const ListRoomsSaved: React.FC = (): JSX.Element => {
  const [toggleClasses, setToggleClasses] = useState<boolean>(true);
  const [listRoomsSaved, setListRoomsSaved] = useState<IRoomSaved[]>([]);

  useEffect(() => {
    const roomsSaved: IRoomSaved[] =
      JSON.parse(localStorage.getItem(ELocalStorageItem.ROOMS_SAVED)) || [];

    setListRoomsSaved(roomsSaved);
  }, []);

  return (
    <>
      <div className="d-sm-flex absolute -left-0 z-10 sm:top-3">
        <button
          className="btn btn-sm
            bg-gradient-to-tr from-blue-500 to-blue-800 text-white
            hover:bg-gradient-to-tr
            hover:from-blue-400 hover:to-blue-600
            opacity-30 hover:opacity-100 py-0"
          onClick={() => setToggleClasses(!toggleClasses)}
        >
          <i className="fa fa-list" />
        </button>
      </div>
      <div
        className={`
        d-md-flex flex-column p-3
        col-lg-3 col-md-3 col-8
        absolute
        ${toggleClasses ? "-left-full" : "left-0"}
        z-10
        bg-gradient-to-tr from-gray-800 to-gray-900
        h-full
        -top-0 transition-all ease-in-out duration-500 shadow-2xl
      `}
      >
        <div className="flex justify-between">
          <span>Rooms Saved: {listRoomsSaved.length}</span>
          <button
            className="btn btn-secondary btn-sm d-sm-flex"
            onClick={() => setToggleClasses(!toggleClasses)}
          >
            <i className="fa fa-list" />
          </button>
        </div>
        {listRoomsSaved.map(
          (roomSaved: IRoomSaved, index: number): JSX.Element => {
            return (
              <div
                key={`rooms-saved-${index}`}
                className={`
              border-bottom rounded-sm shadow
              d-flex items-center p-1 pb-2 mt-2
            `}
              >
                <Avatar src={roomSaved.avatar} size={40} />
                <div className="d-flex flex-row w-full justify-between p-1">
                  <div className="flex flex-col ">
                    <span
                      className={`text-sm`}
                      title={`User name: ${roomSaved.userName}`}
                    >
                      {roomSaved.userName} / {roomSaved.room} /{" "}
                      {ETypeChatLabels[roomSaved.typeChat]}
                    </span>
                    {roomSaved.createdAt && (
                      <span
                        className="text-yellow-200"
                        style={{ fontSize: ".6rem" }}
                      >
                        {new Date(roomSaved.createdAt).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    className="btn btn-sm bg-gradient-to-tr from-blue-500 to-blue-800 text-white rounded-2xl w-8 h-8"
                    onClick={() => {
                      router.push(
                        `/chat/${roomSaved.room}?userName=${roomSaved.userName}&userAvatar=${roomSaved.avatar}`
                      );
                    }}
                  >
                    <i className="fa fa-arrow-right" />
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default memo(ListRoomsSaved);
