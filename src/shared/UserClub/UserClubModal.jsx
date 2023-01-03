import React, { useState, useRef } from "react";

const UserClubModal = ({ setIsClubModal, clubData, comma }) => {
  const whiteAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const yellowAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

  const modalRef = useRef([]);
  const handleModal = (e) => {
    if (e.target === modalRef.current["background"]) {
      setIsClubModal(false);
    }
    if (e.target === modalRef.current["closeBtn"]) {
      setIsClubModal(false);
    }
  };

  console.log(clubData);
  const clubImage = "https://mandarin.api.weniv.co.kr/" + clubData.itemImage;
  const clubName = clubData.itemName;
  const clubFee = comma(clubData.price);
  return (
    <section
      className="absolute inset-0 z-30"
      ref={(el) => (modalRef.current["background"] = el)}
      onClick={handleModal}
    >
      <h3 className="ir">게시글 사진 모달</h3>
      <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[39rem] h-[60%] rounded-t-[10px] bg-orange-100 overflow-auto scrollbar-hide">
        <button
          ref={(el) => (modalRef.current["closeBtn"] = el)}
          type="button"
          aria-label="닫기창"
          className="relative w-[100%] h-[3.6rem] border-b-[0.5rem] border-b-s-color/80 before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-s-color before:hover:bg-m-color"
          onClick={handleModal}
        ></button>
        <img src={clubImage} alt="" className="w-[30.4rem] h-[22.8rem] rounded-[10px] mx-auto my-[2rem]" />
        <p>참여중인 모임</p>
        <p className="mx-[4.3rem]">{clubName}</p>
        <p className="mx-[4.3rem]">{clubFee}원</p>
      </div>
    </section>
  );
};

export default UserClubModal;
