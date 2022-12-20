import React from "react";
import UserProfile from "../../share/UserProfile";
import { HeaderBasic } from "../../share/HeaderBind";
import Footer from "../../share/Footer";
import Post from "../../share/Post";
import Club from "../../share/Club";
import ModalInfo from "../../components/ModalInfo/ModalInfo";
import Modal from "../../components/Modal/Modal";
import { useState, useCallback, useRef } from "react";

const MyProfile = () => {
  const [modal, setModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const [blur, setBlur] = useState(false);
  const modalRef = useRef();

  const handleModalInfo = useCallback(
    (e) => {
      setModal(!modal);
      if (e.target === modalRef.current) {
        setModal(!modal);
      }
    },
    [modal]
  );

  const handleModalLogout = useCallback(() => {
    setLogout(!logout);
    setBlur(!blur);
  }, [logout, blur]);

  const handleCloseModal = useCallback(() => {
    setLogout(false);
    setBlur(false);
  }, []);

  return (
    <div className="bg-gray-100">
      {logout === true ? (
        <Modal modalRef={modalRef} content="로그아웃하시겠어요?" value="로그아웃" onModalClose={handleCloseModal} />
      ) : null}
      <div className={`page ${blur ? "blur-sm" : null}`}>
        <HeaderBasic onModalInfo={handleModalInfo} />
        <main className={`h-screen overflow-y-auto scrollbar-hide`}>
          <UserProfile />
          <Club />
          <Post onModalInfo={handleModalInfo} onModalAction={handleModalLogout} />
        </main>
        <Footer />
        {modal === true ? (
          <ModalInfo
            modalRef={modalRef}
            contentOne="설정 및 개인정보"
            contentTwo="로그아웃"
            onModalInfo={handleModalInfo}
            onModalAction={handleModalLogout}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyProfile;
