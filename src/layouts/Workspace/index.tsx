import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import useToggle from "@hooks/useToggle";
import useInput from "@hooks/useInput";
import loadable from "@loadable/component";
import fetcher from "@utils/fetcher";
import { IChannel, IUser, IWorkspace } from "@typings/db";
import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";

import useSocket from "@hooks/useSocket";
import gravatar from "gravatar";
import ChatterList from "@components/ChatterList";
import Header from "@components/Header";

import { IoSearch } from "react-icons/io5";
import { BiHomeHeart } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";

const ChannelList = loadable(() => import("@components/ChannelList"));
const FormModal = loadable(() => import("@components/FormModal"));
const ChattingRoom = loadable(() => import("@pages/ChattingRoom"));
const ChannelHome = loadable(() => import("@pages/ChannelHome"));

const Workspace = () => {
  const queryClient = useQueryClient();
  const { workspace, channel, id } = useParams<{
    workspace?: string;
    channel?: string;
    id?: string;
  }>();

  const [socket, disconnect] = useSocket(workspace);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const { isLoading, data: userData } = useQuery("user", () =>
    fetcher({ queryKey: "http://localhost:3095/api/users" })
  );

  const { data: workspacesData } = useQuery<IWorkspace[]>("workspaces", () =>
    fetcher({ queryKey: "http://localhost:3095/api/workspaces" })
  );

  const { data: channelData } = useQuery<IChannel[]>(
    ["workspace", workspace, "channel"],
    () =>
      fetcher({
        queryKey: `http://localhost:3095/api/workspaces/${
          workspace ? workspace : "chatterbox"
        }/channels`,
      }),
    {
      enabled: !!userData,
    }
  );

  const { data: wsMembersData } = useQuery<IUser[]>("members", () =>
    fetcher({
      queryKey: `http://localhost:3095/api/workspaces/${
        workspace ? workspace : "chatterbox"
      }/members`,
    })
  );

  useEffect(() => {
    if (channelData && userData && socket) {
      socket?.emit("login", {
        id: userData.id,
        channels: channelData.map((v) => v.id),
      });
    }
  }, [socket, channelData, userData, wsMembersData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  useEffect(() => {
    socket?.on("onlineList", (data: number[]) => {
      setOnlineList(data);
    });
    return () => {
      socket?.off("onlineList");
    };
  }, [socket, userData, wsMembersData, setOnlineList]);

  useEffect(() => {
    setOnlineList([]);
  }, [workspace]);

  const [openList, setValue, setTrue, setFalse, toggle] = useToggle(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkpsace] = useInput("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput("");
  const [showAddWsModal, setShowAddWsModal] = useState(false);
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");
  const [showAdChannelModal, setShowAdChannelModal] = useState(false);

  const onAddChannelHandler = useCallback(() => {
    setShowAdChannelModal(true);
  }, [setShowAdChannelModal]);
  const onCloseModalHandler = useCallback(() => {
    setShowAddWsModal(false);
    setShowAdChannelModal(false);
  }, [setShowAddWsModal]);
  const addWorkSpaceModalHandler = useCallback(() => {
    setShowAddWsModal(true);
  }, [setShowAddWsModal]);
  const onCreateWorkspace = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          "http://localhost:3095/api/workspaces",
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          queryClient.refetchQueries("user"); //사용자 로그인 정보 재호출
          queryClient.refetchQueries("workspacesData"); //사용자 로그인 정보 재호출
          setNewUrl("");
          setNewWorkpsace("");
          onCloseModalHandler();
        })
        .catch((error) => console.dir(error.response.data));
    },
    [
      newUrl,
      newWorkspace,
      queryClient,
      setNewWorkpsace,
      setNewUrl,
      onCloseModalHandler,
    ]
  );

  const onCreateChannel = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) return;
      axios
        .post(
          `http://localhost:3095/api/workspaces/${workspace}/channels`,
          { name: newChannel },
          { withCredentials: true }
        )
        .then(() => {
          queryClient.refetchQueries(["workspace", workspace, "channel"]);
          setNewChannel("");
          onCloseModalHandler();
        })
        .catch((error) => {
          console.dir(error.response?.data);
        });
    },
    [workspace, newChannel, setNewChannel]
  );
  const [activeIndex, setActiveIndex] = useState("");

  const onLogoutHandler = useCallback(() => {
    axios
      .post(
        "http://localhost:3095/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => console.dir(error.response.data));
  }, []);

  const onSelectWsHandler = useCallback(
    (e: any) => {
      setActiveIndex(e.currentTarget.id);
    },
    [setActiveIndex]
  );
  if (isLoading) {
    return <div>워크스페이스 로딩중...</div>;
  }
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="float-clear" style={{ height: "100vh" }}>
        <section className="left-panel float-left">
          <ul>
            <li
              id="ws-home"
              onClick={onSelectWsHandler}
              className={
                activeIndex === `ws-home`
                  ? "home ws-item selected"
                  : "home ws-item"
              }
            >
              <Link to={`/workspace`}>
                <BiHomeHeart size="32" color="#fff" />
              </Link>
            </li>
            {workspacesData?.map((ws, idx) => {
              return (
                <li
                  id={`ws${ws.id}`}
                  className={
                    activeIndex === `ws${ws.id}`
                      ? "ws-item selected"
                      : "ws-item"
                  }
                  key={`${idx}`}
                  onClick={onSelectWsHandler}
                >
                  <Link to={`/workspace/${ws.url}`}>{ws.name[0]}</Link>
                </li>
              );
            })}
            <li>
              <button type="button" onClick={addWorkSpaceModalHandler}>
                <MdOutlineAdd size="32" color="#fff" />
              </button>
            </li>
          </ul>
        </section>

        <section className="right-panel float-right float-clear">
          <div className="float-left side-panel">
            <div className="head-label">
              <button> 대화 찾기 또는 시작하기 </button>
            </div>
            <div>
              <div
                className={openList ? `r-panel-util opened` : `r-panel-util`}
              >
                <h5 onClick={toggle}>채팅 채널</h5>
                <button type="button" onClick={onAddChannelHandler}>
                  +
                </button>
              </div>
            </div>
            <ChannelList channelList={channelData} />
            <div className="user-status in-a-row profile-wrap">
              <span className="profile-img">
                <img
                  src={gravatar.url(userData.email, {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`${userData.nickname}`}
                />
              </span>
              <span className="profile-username">{userData.nickname}</span>
              <button type="button" onClick={onLogoutHandler}>
                <FaPowerOff color="#fff" size="16" />
              </button>
            </div>
          </div>
          <div className="content-panel float-right float-clear">
            <Header
              title={
                id
                  ? "Direct Message"
                  : channel
                  ? `#${channel}`
                  : workspace
                  ? `#${workspace}`
                  : "친구 찾기"
              }
            />
            <div className="channel-body">
              <div className="channel-body__left float-left">
                {workspace ? (
                  <ChattingRoom />
                ) : (
                  <>
                    <div className="search-area">
                      <div className="search-form">
                        <input type="text" placeholder="검색하기" />
                        <button type="submit">
                          <IoSearch size="16" />
                        </button>
                      </div>
                      <p>모든 친구 - {wsMembersData?.length}명</p>
                    </div>
                    <div
                      className="scrollbar"
                      style={{
                        height: "calc(100vh - 270px)",
                        overflowY: "auto",
                      }}
                    >
                      <ChatterList myChatters={wsMembersData} />
                    </div>
                  </>
                )}
              </div>
              <div className="channel-body__right float-right">
                <span className="h3">현재 워크스페이스 활동 중</span>
                <div style={{ margin: "1rem 0" }}>
                  <p>
                    친구가 게임이나 음성 채팅과 같은 활동을 시작하면 여기에
                    표시돼요!
                  </p>
                </div>
                <ul className="list-vertical" style={{ margin: "2rem 0" }}>
                  {wsMembersData?.map((member, idx) => {
                    const isOnline = onlineList.includes(member.id);
                    return (
                      <li
                        key={`${member.id}`}
                        className={
                          isOnline
                            ? "list-vertical__item online in-a-row profile-wrap"
                            : "list-vertical__item offline in-a-row profile-wrap"
                        }
                      >
                        <span className="profile-img">
                          <img
                            src={gravatar.url(member.email, {
                              s: "70px",
                              d: "monsterid",
                            })}
                            alt={`${member.nickname}`}
                          />
                        </span>
                        <span className="profile-username">
                          {member.nickname}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* 워크스페이스 추가 모달 */}
      <FormModal
        title="워크스페이스 생성"
        onCloseModalHandler={onCloseModalHandler}
        show={showAddWsModal}
      >
        <form action="" onSubmit={onCreateWorkspace}>
          <div className="modal__body">
            <div className="modal__content">
              <div className="input-form">
                <label>워크스페이스 이름</label>
                <input
                  type="text"
                  className="fullsize"
                  value={newWorkspace}
                  onChange={onChangeNewWorkspace}
                />
              </div>
              <div className="input-form">
                <label>워크스페이스 주소</label>
                <input
                  type="text"
                  className="fullsize"
                  value={newUrl}
                  onChange={onChangeNewUrl}
                />
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <button type="submit" className="btn-regist">
              등록
            </button>
          </div>
        </form>
      </FormModal>
      {/* 채널 추가 모달 */}
      <FormModal
        title="채널 생성"
        onCloseModalHandler={onCloseModalHandler}
        show={showAdChannelModal}
      >
        <form action="" onSubmit={onCreateChannel}>
          <div className="modal__body">
            <div className="modal__content">
              <div className="input-form">
                <label>채널 이름</label>
                <input
                  type="text"
                  className="fullsize"
                  value={newChannel}
                  onChange={onChangeNewChannel}
                />
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <button type="submit" className="btn-regist">
              등록
            </button>
          </div>
        </form>
      </FormModal>
      {/* 친구초대 */}
      {/*    <FormModal
        title="워크스페이스 초대"
        onCloseModalHandler={onCloseModalHandler}
        show={showInviteWsModal}
      >
        <form action="" onSubmit={onInviteHandler}>
          <div className="modal__body">
            <div className="modal__content">
              <div className="input-form">
                <label>이메일</label>
                <input
                  type="email"
                  className="fullsize"
                  value={newMember}
                  onChange={onChangeNewMember}
                />
              </div>
            </div>
          </div>
          <div className="modal__footer">
            <button type="submit" className="btn-regist">
              등록
            </button>
          </div>
        </form>
      </FormModal> */}
    </>
  );
};

export default Workspace;
