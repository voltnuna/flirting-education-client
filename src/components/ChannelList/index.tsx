import { IChannel } from "@typings/db";
import React, { useCallback, useRef, FC, useState } from "react";
import { SiSharp } from "react-icons/si";
import {
  Link,
  Navigate,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

interface Props {
  channelList?: IChannel[];
}

const ChannelList: FC<Props> = ({ channelList }) => {
  const [activeIndex, setActiveIndex] = useState("");
  const { workspace } = useParams<{
    workspace?: string;
  }>();
  const onSelectChannelHandler = useCallback(
    (e: any) => {
      setActiveIndex(e.currentTarget.id);
    },
    [setActiveIndex]
  );

  return (
    <>
      <ul className="scrollarea list-vertical">
        {channelList?.map((channel, idx) => {
          return (
            <li
              key={`${channel.id}--${idx}`}
              id={`list${idx}`}
              className={
                activeIndex === `list${idx}`
                  ? "list-vertical__item selected"
                  : "list-vertical__item"
              }
              onClick={onSelectChannelHandler}
            >
              <Link to={`/workspace/${workspace}/channel/${channel.name}`}>
                <SiSharp size="12" />
                <span>{channel.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChannelList;
