import React from "react";
import { Link, Navigate } from "react-router-dom";

const Footer = () => {
  const home = `${process.env.PUBLIC_URL}/assets/img/icon-home.png`;
  const chat = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;
  const postCreate = `${process.env.PUBLIC_URL}/assets/img/icon-edit.png`;
  const myProfile = `${process.env.PUBLIC_URL}/assets/img/icon-user.png`;

  return (
    <nav className="w-[390px] bg-rose-300 h-[60px] flex justify-around items-center ">
      <Link className="flex flex-col items-center" to="/">
        <img src={home} alt="홈" className="w-[24px] h-[24px]" />
        <span className="text-[10px] text-[#767676]">홈</span>
      </Link>
      <Link className="flex flex-col items-center" to="/chat">
        <img src={chat} alt="채팅" className="w-[24px] h-[24px]" />
        <span className="text-[10px] text-[#767676]">채팅</span>
      </Link>
      <Link className="flex flex-col items-center" to="/postcreate">
        <img src={postCreate} alt="게시글 작성" className="w-[24px] h-[24px]" />
        <span className="text-[10px] text-[#767676]">게시물 작성</span>
      </Link>
      <Link className="flex flex-col items-center" to="/myprofile">
        <img src={myProfile} alt="프로필" className="w-[24px] h-[24px]" />
        <span className="text-[10px] text-[#767676]">프로필</span>
      </Link>
    </nav>
  );
};

export default Footer;
