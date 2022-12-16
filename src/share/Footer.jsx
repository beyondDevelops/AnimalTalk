import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const home = `${process.env.PUBLIC_URL}/assets/img/icon-home.png`;
  const chat = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;
  const postCreate = `${process.env.PUBLIC_URL}/assets/img/icon-edit.png`;
  const myProfile = `${process.env.PUBLIC_URL}/assets/img/icon-user.png`;

  return (
    <nav className="flex px-[0.6rem] pt-[1.2rem] pb-[0.6rem]">
      <Link className="flex flex-col items-center mx-[3rem]" to="/">
        <img src={home} alt="홈" className="w-[2.4rem] h-[2.4rem]" />
        <span className="block mt-[0.4rem] text-[10px] text-[#767676]">홈</span>
      </Link>
      <Link className="flex flex-col items-center mx-[3rem]" to="/chat">
        <img src={chat} alt="채팅" className="w-[2.4rem] h-[2.4rem]" />
        <span className="block mt-[0.4rem] text-[10px] text-[#767676]">채팅</span>
      </Link>
      <Link className="flex flex-col items-center mx-[3rem]" to="/postcreate">
        <img src={postCreate} alt="게시글 작성" className="w-[2.4rem] h-[2.4rem]" />
        <span className="block mt-[0.4rem] text-[10px] text-[#767676]">게시물 작성</span>
      </Link>
      <Link className="flex flex-col items-center mx-[3rem]" to="/myprofile">
        <img src={myProfile} alt="프로필" className="w-[2.4rem] h-[2.4rem]" />
        <span className="block mt-[0.4rem] text-[10px] text-[#767676]">프로필</span>
      </Link>
    </nav>
  );
};

export default Footer;
