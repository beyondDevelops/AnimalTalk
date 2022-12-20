import React from "react";
import ChatRoomFooter from "../../../components/ChatModule/ChatRoomFooter/ChatRoomFooter";
import UserChat from "../../../components/ChatModule/UserChat/UserChat";
import { HeaderChat } from "../../../share/HeaderBind";

const ChatRoom = () => {
  return (
    <div className="page border-cyan-500 border-[1px]">
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
