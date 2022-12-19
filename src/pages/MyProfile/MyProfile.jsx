import React from "react";
import UserProfile from "../../share/UserProfile";
import { HeaderBasic } from "../../share/HeaderBind";
import Footer from "../../share/Footer";
import Post from "../../share/Post";
import Club from "../../share/Club";
import ModalInfo from "../../components/ModalInfo/ModalInfo";
import Modal from "../../components/Modal/Modal";
import { useState, useCallback } from "react";

const MyProfile = () => {
  let [modal, setModal] = useState(false);
  let [logout, setLogout] = useState(false);
  let [blur, setBlur] = useState(false);

  const handleModalInfo = useCallback(() => {
    setModal(!modal);
  });

  const handleModalLogout = useCallback(() => {
    setLogout(!logout);
    setBlur(!blur);
  });

  return (
    <div className="bg-gray-100">
      <div className="page">
        {logout === true ? (
          <Modal content="로그아웃하시겠어요?" value="로그아웃" handleModalLogout={handleModalLogout} />
        ) : null}
        <HeaderBasic handleModalInfo={handleModalInfo} />
        <main className={`h-screen overflow-y-auto scrollbar-hide ${blur ? "blur-sm" : null}`}>
          <UserProfile />
          <Club />
          <Post handleModalInfo={handleModalInfo} handleModalLogout={handleModalLogout} />
        </main>
        <Footer />
        {modal === true ? (
          <ModalInfo
            contentOne="설정 및 개인정보"
            contentTwo="로그아웃"
            handleModalInfo={handleModalInfo}
            handleModalLogout={handleModalLogout}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyProfile;
