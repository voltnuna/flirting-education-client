import React, { useCallback } from "react";
import Header from "@components/Header";
import gravatar from "gravatar";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router";

const ChattingRoom = () => {
  const { workspace, channel } = useParams<{
    workspace?: string;
    channel?: string;
  }>();

  const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Header />
      <div className="chat-area">
        <div className="balloons-wrap scrollbar">
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="div-line">
            <strong>2022.08.15</strong>
          </div>
        </div>
        <div className="chatbox-wrapper">
          <form action="" onSubmit={onSubmitHandler} className="in-a-row">
            <textarea name="" id="" rows={1}></textarea>
            <button type="submit">
              <IoIosSend size="20" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
