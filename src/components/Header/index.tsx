import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  menus: { path?: string; name: string }[];
  title?: string;
}

const Header: FC<Props> = ({ title, menus }) => {
  return (
    <>
      <header>
        <nav>
          <ul className="list-horizontal">
            {title && (
              <li>
                <span className="list-title">{title}</span>
              </li>
            )}
            {menus.map((menu, idx) => {
              return (
                <li key={`header--${idx}`} className="list-horizontal__item">
                  <Link to={`/${menu.path}`}>{menu.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
