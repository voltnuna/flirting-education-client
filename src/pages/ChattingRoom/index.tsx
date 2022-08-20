import React, { useCallback } from "react";
import Header from "@components/Header";
import gravatar from "gravatar";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router";
import useInput from "@hooks/useInput";
import axios, { AxiosError } from "axios";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { IDM } from "@typings/db";
import fetcher from "@utils/fetcher";

const ChattingRoom = () => {
  const { workspace, channel, id } = useParams<{
    workspace?: string;
    channel?: string;
    id?: string;
  }>();
  const queryClient = useQueryClient();
  const [chat, onChangeChat, setChat] = useInput("");
  /* 내 정보 */
  const { data: myData } = useQuery("user", () =>
    fetcher({ queryKey: "http://localhost:3095/api/users" })
  );
  /* 상대방 정보 id */
  const { data: userData } = useQuery(
    ["workspace", workspace, "users", id],
    () => {
      id &&
        fetcher({
          queryKey: `http://localhost:3095/api/workspaces/${workspace}/users/${id}`,
        });
    }
  );
  /* 나와 상대방이 나눈 채팅 정보 가져오기*/
  const { data: chatData, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IDM[]
  >(
    ["workspace", workspace, "dm", id, "chat"],
    ({ pageParam }) => {
      return fetcher({
        queryKey: `http://localhost:3095/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${
          pageParam ? parseInt(pageParam + 1) : 1
        }`,
      });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length;
      },
    }
  );

  const onKeydownChat = useCallback((e: any) => {
    if (e.key === "Enter") {
      console.log(e);
      if (!e.shiftKey) {
        e.preventDefault();
        onSubmitChatHandler(e);
        console.log(e);
      }
    }
  }, []);
  if (chatData) {
    console.log("chatData", chatData);
  }
  const onSubmitChatHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!chat?.trim()) return;
      axios
        .post(
          `http://localhost:3095/api/workspaces/${workspace}/dms/${id}/chats`,
          { content: chat },
          { withCredentials: true }
        )
        .then(() => {
          setChat("");
        })
        .catch((error) => {
          console.dir(error.response.data);
        });
    },
    [chat, setChat, workspace, id]
  );

  return (
    <>
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
          <form action="" onSubmit={onSubmitChatHandler} className="in-a-row">
            <textarea
              name=""
              id=""
              rows={1}
              value={chat}
              onChange={onChangeChat}
            ></textarea>
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
