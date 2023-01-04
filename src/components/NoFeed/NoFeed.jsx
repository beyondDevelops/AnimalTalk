import React from "react";
import { useNavigate } from "react-router-dom/dist";

const NoFeed = () => {
  const defaultImg = `${process.env.PUBLIC_URL}/assets/img/char-default-cat.svg`;

  const navigate = useNavigate();

  return (
    <section className="h-full my-auto flex flex-col justify-center items-center">
      <h2 className="ir">유저를 검색해주세요.</h2>
      <img src={defaultImg} alt="팔로우하는 유저가 없습니다." className="w-[14.5rem] h-[20rem] align-bottom" />
      <p className="text-cst-gray">유저를 검색해 팔로우 해보세요!</p>
      <button
        type="button"
        className="btn-lg bg-m-color mt-[2rem] text-center text-[#fff]"
        onClick={() => navigate("/search")}
      >
        검색하기
      </button>
    </section>
  );
};

export default NoFeed;
