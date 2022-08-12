import React, { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import { SiSharp } from "react-icons/si";
import SearchModal from "@components/SearchModal";
import Header from "@components/Header";
import ChannelHome from "@pages/ChannelHome";
import useToggle from "@hooks/useToggle";
import { useNavigate } from "react-router-dom";

const Workspace = () => {
  const [openList, setValue, setTrue, setFalse, toggle] = useToggle(false);
  const onAddChannelHandler = useCallback(() => {}, []);

  return (
    <>
      <div className="float-clear" style={{ height: "100vh" }}>
        <section className="left-panel float-left">
          <ul>
            <li>
              <Link to="/">
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
              <ul className="scrollarea list-vertical">
                <li className="list-vertical__item selected">
                  <Link to="/">
                    <SiSharp size="12" />
                    <span>일반</span>
                  </Link>
                </li>
                <li className="list-vertical__item">
                  <Link to="/">
                    <SiSharp size="12" />
                    <span>후후</span>
                  </Link>
                </li>
                <li className="list-vertical__item">
                  <Link to="/">
                    <SiSharp size="12" />
                    <span>주님만 따르네</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-panel float-right">
            <ChannelHome />
          </div>
        </section>
      </div>
    </>
  );
};

export default Workspace;
