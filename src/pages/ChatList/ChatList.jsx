import React from "react";
import Header from "../../shared/Header/Header";
import Footer from "../../shared/Footer/Footer";
// import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import ChatDummyData from "../../components/ChatDummyData/ChatDummyData";

const Chat = () => {
  return (
    <>
      <Header headerFor="chat" />
      <main>
        <ul className="mt-[2rem]">
          <ChatDummyData />
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default Chat;
