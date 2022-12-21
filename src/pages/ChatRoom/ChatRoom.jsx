import React from "react";
import ChatRoomFooter from "../../components/ChatModule/ChatRoomFooter";
import UserChat from "../../components/ChatModule/UserChat";
import { HeaderChat } from "../../shared/Header/HeaderChat";

const ChatRoom = () => {
  return (
    <div className="page">
      <HeaderChat />
      <main className="bg-[#F2F2F2] pb-[1rem] flex flex-col justify-end">
        <UserChat user="your" />
        <UserChat user="my" />
      </main>
      <ChatRoomFooter />
    </div>
  );
};

export default ChatRoom;
