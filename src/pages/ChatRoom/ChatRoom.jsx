import React from "react";
import { useRef } from "react";
import { useState } from "react";
import ChatRoomFooter from "../../components/ChatModule/ChatRoomFooter";
import UserChat from "../../components/ChatModule/UserChat";
import ModalInfo from "../../components/ModalModule/ModalInfo";
import { HeaderChat } from "../../shared/Header/HeaderChat";

const ChatRoom = () => {
  const [onModal, setOnModal] = useState(false);
  const modalRef = useRef();

  const handleModalInfo = (e) => {
    if (e.target === modalRef.current) {
      setOnModal(!onModal);
    }
  };

  const handleModal = () => {
    setOnModal(!onModal);
  };

  return (
    <div className="page">
      <HeaderChat onModalInfo={handleModal} />
      <main className="bg-[#F2F2F2] pb-[1rem] flex flex-col justify-end">
        <UserChat user="your" />
        <UserChat user="my" />
      </main>
      <ChatRoomFooter />
      {onModal ? <ModalInfo modalRef={modalRef} contentOne="채팅방 나가기" onModalInfo={handleModalInfo} /> : null}
    </div>
  );
};

export default ChatRoom;
