import React from "react";
import { Link } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";
import SearchModal from "@components/SearchModal";
import Header from "@components/Header";
import ChannelHome from "@pages/ChannelHome";

const Workspace = () => {
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
            <div>
              <span> 대화 찾기 또는 시작하기 </span>
            </div>

            <div>
              <div>
                <span className="arrow"></span>
                <h5>채팅 채널</h5>
                <button type="button">+</button>
              </div>

              <ul className="scrollarea">
                <li>
                  <Link to="/">#일반</Link>
                </li>
                <li>
                  <Link to="/">#후후</Link>
                </li>
                <li>
                  <Link to="/">#주님만-따르네</Link>
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
