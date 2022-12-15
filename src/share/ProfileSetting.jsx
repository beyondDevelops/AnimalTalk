import React from "react";
import { Link } from "react-router-dom";

const ProfileSetting = ({ name, btnName, text }) => {
  const myProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;
  const upload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;

  return (
    <div className="bg-lime-400">
      <main className="w-[390px] h-screen mx-auto bg-white flex flex-col">
        <strong className="pt-[30px] pb-[12px] text-center text-[24px] font-medium">{name}</strong>
        <p className="text-center text-[#767676]">{text}</p>
        <button className="mx-[auto] relative my-[30px]">
          <img src={myProfile} alt="" className="w-[110px] h-[110px]" />
          <img src={upload} alt="" className="w-[36px] h-[36px] absolute right-0 bottom-0" />
        </button>
        <form action="" className="flex flex-col items-center ">
          <fieldset className="mb-[16px]">
            <legend className="ir">사용자 이름</legend>

            <label htmlFor="name" className="block text-[12px] text-[#767676] py-[4px]">
              사용자 이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="2~10자 이내여야 합니다."
              className="w-[322px] border-b-[1px] border-[#DBDBDB]"
            />
          </fieldset>

          <fieldset className="mb-[16px]">
            <legend className="ir">계정 ID</legend>
            <label htmlFor="userId" className="block text-[12px] text-[#767676] py-[4px]">
              계정 ID
            </label>
            <input
              id="userId"
              type="text"
              placeholder="영문,숫자,특수문자(.),(_)만 사용 가능합니다."
              className="w-[322px] border-b-[1px] border-[#DBDBDB]"
            />
          </fieldset>

          <fieldset>
            <legend className="ir">소개</legend>
            <label htmlFor="intro" className="block text-[12px] text-[#767676] py-[4px]">
              소개
            </label>
            <input
              id="intro"
              type="text"
              placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
              className="w-[322px] border-b-[1px] border-[#DBDBDB]"
            />
          </fieldset>

          <Link to="/" className="btn-xl bg-[#FCD690] text-[#fff] mt-[30px] mb-[20px] text-center">
            {btnName}
          </Link>
        </form>
      </main>
    </div>
  );
};

export default ProfileSetting;
