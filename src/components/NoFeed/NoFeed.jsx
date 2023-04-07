import React from "react";
import { useNavigate, useParams } from "react-router-dom/dist";

const NoFeed = () => {
  const defaultImg = `${process.env.PUBLIC_URL}/assets/img/char-default-cat.svg`;

  const { accountname } = useParams();
  const navigate = useNavigate();

  return accountname ? (
    <>
      <img src={defaultImg} alt="노트북을 들고 있는 고양이" className="mx-[auto] mt-[25%] mb-[3rem]" />
      <p className="text-[1.6rem] text-center text-m-color">작성된 게시글이 없어요...ㅠㅠ</p>
    </>
  ) : (
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
