import Header from "@components/Header";
import React, { useCallback } from "react";
import { dummyUserData } from "@assets/data";
import gravatar from "gravatar";

const ChattingRoom = () => {
  return (
    <>
      <Header title={`@${dummyUserData[0].nickname}`} />
      <div>
        <div>
          <span className="profile-img">
            <img
              src={gravatar.url("doeun@gmail.com", {
                s: "50px",
                d: "monsterid",
              })}
              alt={`김도은`}
            />
          </span>
          <span>김도은</span>
        </div>
        <div className="chatbox-wrapper">
          <textarea name="" id="" cols={30} rows={10}></textarea>
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
