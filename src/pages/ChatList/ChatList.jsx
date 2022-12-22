import React from "react";
import Footer from "../../shared/Footer/Footer";
import { HeaderBasic } from "../../shared/Header/HeaderBasic";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";

const Chat = () => {
  return (
    <div className="page">
      <HeaderBasic />
      <main>
        <ul className="mt-[2rem]">
          <SimpleUserList isBtn={false} />
          <SimpleUserList isBtn={false} />
          <SimpleUserList isBtn={false} />
          <SimpleUserList isBtn={false} />
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
