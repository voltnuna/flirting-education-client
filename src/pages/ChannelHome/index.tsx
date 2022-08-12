import Header from "@components/Header";
import React from "react";

const ChannelHome = () => {
  return (
    <>
      <div>
        <Header
          title="친구"
          menus={[
            { name: "전체", path: "all" },
            { name: "차단", path: "block" },
          ]}
        />
        <div></div>
      </div>
    </>
  );
};

export default ChannelHome;
