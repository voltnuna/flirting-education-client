import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Header from "@components/Header";
import ChatterList from "@components/ChatterList";
import { useQuery } from "react-query";
import { IUser } from "@typings/db";
import fetcher from "@utils/fetcher";

const ChannelHome = () => {
  const { workspace } = useParams<{
    workspace?: string;
  }>();

  const { data: wsMembersData } = useQuery<IUser[]>("members", () =>
    fetcher({
      queryKey: `http://localhost:3095/api/workspaces/${
        workspace ? workspace : "chatterbox"
      }/members`,
    })
  );

  const onSwitchPage = useCallback(() => {}, []);

  return (
    <>
      <div>
        <Header title="친구" onSwitchPage={onSwitchPage} />
        <div className="channel-body float-clear">
          <div className="channel-body__left float-left">
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
              style={{ height: "calc(100vh - 270px)", overflowY: "auto" }}
            >
              <ChatterList myChatters={wsMembersData} />
            </div>
          </div>
          <div className="channel-body__right float-right">
            <span className="h3">현재 활동 중</span>
            <div>
              <span className="h5">지금은 조용하네요...</span>
              <p>
                친구가 게임이나 음성 채팅과 같은 활동을 시작하면 여기에
                표시돼요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelHome;
