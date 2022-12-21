import React from "react";
import { Link } from "react-router-dom";

const ProfileSetting = ({ name, btnName, text, isBtn }) => {
  const myProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;
  const upload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;

  return (
    <div className="page">
      <main className="h-screen flex flex-col">
        <strong className="pt-[3rem] pb-[1.2rem] text-center text-[2.4rem] font-medium">{name}</strong>
        <p className="text-center text-cst-gray">{text}</p>
        <button className="mx-[auto] relative my-[3rem]">
          <img src={myProfile} alt="" className="w-[11rem] h-[11rem]" />
          <img src={upload} alt="" className="w-[3.6rem] h-[3.6rem] absolute right-0 bottom-0" />
        </button>
        <form action="" className="flex flex-col items-center ">
          <fieldset className="mb-[1.6rem]">
            <legend className="ir">사용자 이름</legend>

            <label htmlFor="name" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              사용자 이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="2~10자 이내여야 합니다."
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem]"
            />
          </fieldset>

          <fieldset className="mb-[1.6rem]">
            <legend className="ir">계정 ID</legend>
            <label htmlFor="userId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              계정 ID
            </label>
            <input
              id="userId"
              type="text"
              placeholder="영문,숫자,특수문자(.),(_)만 사용 가능합니다."
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem]"
            />
          </fieldset>

          <fieldset>
            <legend className="ir">소개</legend>
            <label htmlFor="intro" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              소개
            </label>
            <input
              id="intro"
              type="text"
              placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem]"
            />
          </fieldset>

          {isBtn ? (
            <Link to="/home" className="btn-xl bg-s-color text-[#fff] mt-[3rem] mb-[2rem] text-center">
              {btnName}
            </Link>
          ) : (
            <></>
          )}
        </form>
      </main>
    </div>
  );
};

export default ProfileSetting;
