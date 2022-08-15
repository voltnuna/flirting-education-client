import React, { FC, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiChatNewFill } from "react-icons/ri";
import { CgInbox } from "react-icons/cg";

interface Props {
  menus?: { path?: string; name: string }[];
  title?: string;
  onSwitchPage?: () => void;
}

const Header: FC<Props> = ({ title, menus, onSwitchPage }) => {
  const navi = useNavigate();

  return (
    <>
      <header>
        <nav>
          <ul className="list-horizontal">
            {title && (
              <li>
                <span className="h5">{title}</span>
              </li>
            )}
            {menus?.map((menu, idx) => {
              return (
                <li key={`header--${idx}`} className="list-horizontal__item">
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchPage && onSwitchPage();
                    }}
                  >
                    {menu.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <ul className="list-horizontal head-utilbox">
            <li className="list-horizontal__item">
              <button type="button">
                <RiChatNewFill color="#b9bbbe" size="23" />
              </button>
            </li>
            <li>
              <button>
                <CgInbox color="#b9bbbe" size="23" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
