import React, { FC } from "react";

interface Props {
  WsList: {
    wsname: string;
    category: string;
    verifyage: string;
    greeting: string;
  }[];
}

const WorkspaceList: FC<Props> = ({ WsList }) => {
  return (
    <>
      <ul className="ws--lists scrollbar">
        {WsList?.map((ws, idx) => {
          return (
            <li key={`ws-${ws.wsname}--${ws.category}${idx}`}>
              <div className="float-clear ws--title">
                <span className="h3">{ws.wsname}</span>
                <span
                  className={
                    ws.verifyage === "Adult"
                      ? "float-right badge negative"
                      : "float-right badge positive"
                  }
                >
                  {ws.verifyage}
                </span>
              </div>
              <div className="ws--summary">{ws.greeting}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WorkspaceList;
