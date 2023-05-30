import router from "next/router";
import React, { memo, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import { ELocalStorageItem } from "../../../shared/rooms-saved/enum";
import { IRoomSaved } from "../../../shared/rooms-saved/types";
import { ETypeChatLabels } from "../../../utils/interfaces";
import { IUserRoom } from "../functions/types";

const ListRoomsSaved: React.FC = (): JSX.Element => {
  const [toggleClasses, setToggleClasses] = useState<boolean>(true);
  const [listRoomsSaved, setListRoomsSaved] = useState<IRoomSaved[]>([]);

  useEffect(() => {
    const roomsSaved: IRoomSaved[] =
      JSON.parse(localStorage.getItem(ELocalStorageItem.ROOMS_SAVED)) || [];

    setListRoomsSaved(roomsSaved);
  }, []);

  return (
    <>
      <div className="d-flex position-absolute -left-0 z-10 top-3">
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
        d-flex flex-column p-3
        col-lg-3 col-md-3 col-8
        position-absolute
        z-10
        bg-gradient-to-tr from-gray-800 to-gray-900
        -top-0 transition-all ease-in-out duration-500 shadow-2xl
      `}
      style={{left: toggleClasses ? '-100%' : 0, height: '100%'}}
      >
        <div className="flex justify-between">
          <span>Rooms Saved: {listRoomsSaved.length}</span>
          <button
            className="btn btn-secondary btn-sm d-flex"
            style={{marginLeft: '1rem'}}
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
                className={`border-bottom rounded-sm shadow d-flex items-center p-1 pb-2 mt-2
            `}
              >
                <Avatar src={roomSaved.avatar} size={40} />
                <div className="d-flex flex-row justify-between p-1 w-100">
                  <div className="flex flex-col" style={{marginLeft: '.8rem'}}>
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
                    className="btn btn-sm bg-gradient-to-tr from-blue-500 to-blue-800 text-white rounded-2xl"
                    style={{height: '2rem', width: '2rem', marginLeft: '1rem'}}
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
