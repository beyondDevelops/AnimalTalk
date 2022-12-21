import React from "react";
import { Link } from "react-router-dom";

const NoFeed = () => {
  const defaultImg = `${process.env.PUBLIC_URL}/assets/img/char-default-cat.svg`;

  return (
    <section className="h-full my-auto flex flex-col justify-center items-center">
      <h2 className="ir">유저를 검색해주세요.</h2>
      <img src={defaultImg} alt="팔로우하는 유저가 없습니다." className="w-[14.5rem] h-[20rem] align-bottom" />
      <p className="text-cst-gray">유저를 검색해 팔로우 해보세요!</p>
      <Link to="/search" className="btn-lg bg-m-color mt-[2rem] text-center text-[#fff]">
        검색하기
      </Link>
    </section>
  );
};

export default NoFeed;
