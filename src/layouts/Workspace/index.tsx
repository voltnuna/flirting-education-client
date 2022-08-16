import React, { useCallback, useState } from "react";
import { Link, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import useToggle from "@hooks/useToggle";
import loadable from "@loadable/component";
import { BiHomeHeart } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useParams } from "react-router";
import ChannelList from "@components/ChannelList";
import fetcher from "@utils/fetcher";
import { IChannel, IUser, IWorkspace } from "@typings/db";
import useInput from "@hooks/useInput";
const FormModal = loadable(() => import("@components/FormModal"));
const ChattingRoom = loadable(() => import("@pages/ChattingRoom"));
const ChannelHome = loadable(() => import("@pages/ChannelHome"));

const Workspace = () => {
  const queryClient = useQueryClient();
  const { workspace } = useParams<{
    workspace?: string;
  }>();
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
        queryKey: `http://localhost:3095/api/workspaces/${workspace}/channels`,
      }),
    {
      enabled: !!userData,
    }
  );

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
            <li className="home">
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
          </div>
          <div className="content-panel float-right">
            <Routes>
              <Route path={`/workspace/${workspace}/user/:id`}></Route>
              <Route path={`/workspace/${workspace}/channel/user`}></Route>
            </Routes>
            {/* */}
            {channelData ? <ChattingRoom /> : <ChannelHome />}
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
    </>
  );
};

export default Workspace;
