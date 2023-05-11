import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { instance } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  const home = `${process.env.PUBLIC_URL}/assets/img/icon-home.svg`;
  const homeFill = `${process.env.PUBLIC_URL}/assets/img/icon-home-fill.png`;
  const chat = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.svg`;
  const chatFill = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-fill.png`;
  const postCreate = `${process.env.PUBLIC_URL}/assets/img/icon-edit.png`;
  const myProfile = `${process.env.PUBLIC_URL}/assets/img/icon-user.png`;
  const myProfileFill = `${process.env.PUBLIC_URL}/assets/img/icon-user-fill.png`;

  const location = useLocation();
  const { accountname } = useContext(AuthContext);
  const { image } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState();
  const editAccountname = userInfo?.accountname;

  useEffect(() => {
    if (!userInfo) {
      const token = localStorage.getItem("token");
      const getUserInfo = async () => {
        try {
          const res = await instance.get("/user/myinfo", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo({ ...res.data.user });
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
  }, [userInfo]);

  return (
    <nav className="flex px-[0.6rem] pt-[1.2rem] pb-[0.6rem] justify-between">
      <Link className="flex flex-col items-center mx-[auto]" to="/home">
        {location.pathname === "/home" ? (
          <>
            <img src={homeFill} alt="홈" className="w-[2.4rem] h-[2.4rem]" />
            <span className="block mt-[0.4rem] text-[1rem] text-m-color">홈</span>
          </>
        ) : (
          <>
            <img src={home} alt="홈" className="w-[2.4rem] h-[2.4rem]" />
            <span className="block mt-[0.4rem] text-[1rem] text-cst-gray">홈</span>
          </>
        )}
      </Link>
      <Link className="flex flex-col items-center mx-[auto]" to="/chat">
        {location.pathname === "/chat" ? (
          <>
            <img src={chatFill} alt="채팅" className="w-[2.4rem] h-[2.4rem]" />
            <span className="block mt-[0.4rem] text-[1rem] text-m-color">채팅</span>
          </>
        ) : (
          <>
            <img src={chat} alt="채팅" className="w-[2.4rem] h-[2.4rem]" />
            <span className="block mt-[0.4rem] text-[1rem] text-cst-gray">채팅</span>
          </>
        )}
      </Link>
      <Link className="flex flex-col items-center mx-[auto]" to="/postupload" state={{ image: `${image}` }}>
        <img src={postCreate} alt="게시글 작성" className="w-[2.4rem] h-[2.4rem]" />
        <span className="block mt-[0.4rem] text-[1rem] text-cst-gray">게시물 작성</span>
      </Link>
      <Link
        className="flex flex-col items-center mx-[auto]"
        to={`/profile/${editAccountname ? editAccountname : accountname}`}
        state={{ myAccountname: `${editAccountname ? editAccountname : accountname}` }}
      >
        {location.pathname === `/profile/${editAccountname ? editAccountname : accountname}` ? (
          <>
            <img src={myProfileFill} alt="프로필" className="w-[2.4rem] h-[2.4rem]" />
            <span className="block mt-[0.4rem] text-[1rem] text-m-color">프로필</span>
          </>
        ) : (
          <>
            <img src={myProfile} alt="프로필" className="w-[2.4rem] h-[2.4rem]" />
            <span className="block mt-[0.4rem] text-[1rem] text-cst-gray">프로필</span>
          </>
        )}
      </Link>
    </nav>
  );
};

export default Footer;
