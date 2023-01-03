import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

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
      <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[39rem] h-[70%] rounded-t-[10px] bg-orange-200 overflow-auto scrollbar-hide">
        <button
          ref={(el) => (modalRef.current["closeBtn"] = el)}
          type="button"
          aria-label="닫기창"
          className="relative w-[100%] h-[3.6rem] border-b-[0.1rem] border-b-white before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-white before:hover:bg-m-color"
          onClick={handleModal}
        ></button>
        {/* <div className="flex justify-end"> */}
        <Link
          className="relative inline-block ml-[27.5rem] mr-[2rem] mt-[1.5rem] text-[1.2rem] text-cst-gray before:absolute before:left-[3.1rem] before:bottom-[0.8rem] before:content-[''] before:w-[0.3rem] before:h-[0.3rem] before:rounded-full before:bg-cst-gray hover:text-m-color"
          to={`clubupload/${clubData.id}`}
          state={{ clubData: `${clubData}` }}
        >
          수정
        </Link>
        <button className="text-[1.2rem] text-cst-gray hover:text-m-color">삭제</button>
        {/* </div> */}
        <img src={clubImage} alt="" className="w-[30.4rem] h-[22.8rem] rounded-[10px] mx-auto mt-[1rem] mb-[3rem]" />
        <p className="mx-[5rem] text-[1.2rem] w-[29rem] font-medium text-cst-gray">
          모임명
          <strong className="block text-[1.4rem] mt-[0.4rem] mb-[1.8rem] py-[0.4rem] text-black font-normal border-b-[0.1rem] border-b-white">
            {clubName}
          </strong>
        </p>
        <p className="mx-[5rem] text-[1.2rem] w-[29rem] font-medium text-cst-gray">
          참가비
          <strong className="block text-[1.4rem] mt-[0.4rem] mb-[1.8rem] py-[0.4rem] text-black font-normal border-b-[0.1rem] border-b-white">
            {clubFee}원
          </strong>
        </p>
      </div>
    </section>
  );
};

export default UserClubModal;
