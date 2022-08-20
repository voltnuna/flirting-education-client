import React, { FC, useCallback } from "react";
import gravatar from "gravatar";
import { BsThreeDotsVertical, BsChatDotsFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { IUser } from "@typings/db";
import { useQuery } from "react-query";
import fetcher from "@utils/fetcher";

interface Props {
  myChatters: IUser[] | undefined;
  /*   onModalShow: (email: string) => void;
   */ // onInviteWsHandler: (memberId: string) => void;
}

const ChatterList: FC<Props> = ({ myChatters }) => {
  const { workspace } = useParams<{
    workspace?: string;
  }>();

  return (
    <>
      <ul className="list-vertical">
        {myChatters?.map((chatter, idx) => {
          return (
            <li
              className="list-vertical__item chatterlist"
              key={`$chatter--${idx}`}
            >
              <Link
                to={`/workspace/${workspace ? workspace : "chatterbox"}/dms/${
                  chatter.id
                }/chats`}
                className="center-vertical"
              >
                <span className="profile-img">
                  <img
                    src={gravatar.url(chatter.email, {
                      s: "50px",
                      d: "monsterid",
                    })}
                    alt={`${chatter.nickname}`}
                  />
                </span>
                <span>{chatter.nickname}</span>
              </Link>
              <div className="util in-a-row">
                <button type="button">
                  <BsChatDotsFill size="15" color="#b9bbbe" />
                </button>
                <button type="button">
                  <BsThreeDotsVertical size="15" color="#b9bbbe" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChatterList;
