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

import gravatar from "gravatar";

import { IoSearch } from "react-icons/io5";
import { BiHomeHeart } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";

import ChatterList from "@components/ChatterList";
import Header from "@components/Header";
import WorkspaceList from "@components/WorkspaceList";
import { wsLists } from "@assets/ts/dummy";
import ChannelChat from "@pages/ChannelChat";

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

  const [onlineList, setOnlineList] = useState<number[]>([]);

  const { isLoading, data: userData } = useQuery("users", () =>
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
    setOnlineList([]);
  }, [workspace]);

  const [openList, setValue, setTrue, setFalse, toggle] = useToggle(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkpsace] = useInput("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput("");
  const [showAddWsModal, setShowAddWsModal] = useState(false);
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");
  const [showAdChannelModal, setShowAdChannelModal] = useState(false);
  const [searchUser, onChangeSearchUser, setSearchUser] = useInput("");
  const [filteredUser, setFilteredUser] = useState(wsMembersData);

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
          queryClient.refetchQueries("users"); //사용자 로그인 정보 재호출
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

  const onSearchUserHandler = useCallback(
    (e: any) => {
      const reg = /[a-zA-Z]{5},/g;
      e.preventDefault();
      console.log(filteredUser);
      wsMembersData?.map((member, idx) => {
        return member.nickname.includes(searchUser) && member;
      });
    },
    [wsMembersData, searchUser, setFilteredUser]
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
            <ChannelList channelData={channelData} />
            <div className="user-status profile-wrap float-clear">
              <div className="in-a-row">
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
              </div>
              <button
                type="button"
                onClick={onLogoutHandler}
                className="float-right"
                style={{ transform: "translateY(70%)" }}
              >
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
                  : "Flirting Education💕"
              }
            />
            <div className="channel-body">
              {/* DM은 채터박스로 간다 */}
              <div className="channel-body__left float-left">
                {workspace === "chatterbox" && id ? (
                  <ChattingRoom />
                ) : (channel && !id) || (workspace && !channel) ? (
                  <div>채널 채팅 페이지 준비중입니다</div>
                ) : (
                  <>
                    <div className="search-area">
                      <form
                        className="search-form"
                        onSubmit={onSearchUserHandler}
                      >
                        <input
                          type="text"
                          placeholder="그룹 찾기"
                          value={searchUser}
                          onChange={onChangeSearchUser}
                        />
                        <button type="submit">
                          <IoSearch size="16" />
                        </button>
                      </form>
                      <p></p>
                    </div>

                    <WorkspaceList WsList={wsLists} />
                  </>
                )}
              </div>
              {/* onlineList */}
              <div className="channel-body__right float-right">
                <span className="h3">플러터 랭킹 👑</span>
                <div style={{ margin: "1rem 0" }}>
                  <p>연애고민 해결사 랭킹</p>
                </div>
                <ul className="list-vertical" style={{ margin: "2rem 0" }}>
                  <div
                    className="scrollbar"
                    style={{
                      height: "calc(100vh - 270px)",
                      overflowY: "auto",
                    }}
                  >
                    <ChatterList
                      myChatters={wsMembersData}
                      myDataId={userData.id}
                    />
                  </div>
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
