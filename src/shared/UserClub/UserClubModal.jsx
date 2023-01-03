import React, { useState, useRef } from "react";

const UserClubModal = ({ setIsClubModal, clubData }) => {
  const whiteAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const yellowAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

  const modalRef = useRef();
  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setIsClubModal(false);
    }
  };

  console.log(clubData);

  return (
    <section className="absolute inset-0 z-30 bg-rose-100/50" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">게시글 사진 모달</h3>
      <div></div>
    </section>
  );
};

export default UserClubModal;
