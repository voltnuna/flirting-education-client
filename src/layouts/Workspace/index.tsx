import React, { useCallback, useState } from "react";
import { Link, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import useToggle from "@hooks/useToggle";
import loadable from "@loadable/component";
import { SiSharp } from "react-icons/si";
import { BiHomeHeart } from "react-icons/bi";
import { useParams } from "react-router";

const SearchModal = loadable(() => import("@components/SearchModal"));
const ChattingRoom = loadable(() => import("@pages/ChattingRoom"));
const ChannelHome = loadable(() => import("@pages/ChannelHome"));

const Workspace = () => {
  const [openList, setValue, setTrue, setFalse, toggle] = useToggle(false);
  const onAddChannelHandler = useCallback(() => {}, []);
  const { workspace, channel } = useParams<{
    workspace?: string;
    channel?: string;
  }>();

  return (
    <>
      <div className="float-clear" style={{ height: "100vh" }}>
        <section className="left-panel float-left">
          <ul>
            <li>
              <Link to="/workspace/chatterbox">
                <BiHomeHeart size="32" color="#fff" />
              </Link>
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
            <ul className="scrollarea list-vertical">
              <li className="list-vertical__item selected">
                <Link to="/workspace/chatterbox/channel/@일반">
                  <SiSharp size="12" />
                  <span>일반</span>
                </Link>
              </li>
              <li className="list-vertical__item">
                <Link to="/workspace/chatterbox/channel/@후후">
                  <SiSharp size="12" />
                  <span>후후</span>
                </Link>
              </li>
              <li className="list-vertical__item">
                <Link to="/workspace/chatterbox/channel/@주님만따르네">
                  <SiSharp size="12" />
                  <span>주님만 따르네</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="content-panel float-right">
            <Routes>
              <Route path="/workspace/chatterbox/user/:id"></Route>
              <Route path="/workspace/chatterbox/channel/user"></Route>
            </Routes>
            {/* */}
            {channel ? <ChattingRoom /> : <ChannelHome />}
          </div>
        </section>
      </div>
    </>
  );
};

export default Workspace;
