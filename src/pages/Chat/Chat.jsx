import React from "react";
import Footer from "../../share/Footer";
import { HeaderBasic } from "../../share/HeaderBind";
import SimpleUserList from "../../share/SimpleUserList";

const Chat = () => {
  return (
    <div className="page">
      {/* <header className="h-[48px] bg-green-300">헤더가 들어갑니다.</header> */}
      <HeaderBasic />
      <main>
        <ul className="mt-[2rem]">
          <SimpleUserList />
          <SimpleUserList />
          <SimpleUserList />
          <SimpleUserList />
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
