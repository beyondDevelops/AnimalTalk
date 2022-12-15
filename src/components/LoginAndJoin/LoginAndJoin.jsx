import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginAndJoin = ({ name, btnName, option }) => {
  return (
    <div className="bg-lime-400">
      <main className="w-[390px] h-screen mx-auto bg-white flex flex-col">
        <strong className="pt-[30px] pb-[40px] text-center text-[24px] font-medium">{name}</strong>
        <form action="" className="flex flex-col items-center ">
          <fieldset className="mb-[16px]">
            <legend className="ir">로그인</legend>

            <label htmlFor="emailId" className="block text-[12px] text-[#767676] py-[4px]">
              이메일
            </label>
            <input id="emailId" type="email" className="w-[322px] border-b-[1px] border-[#DBDBDB]" />
          </fieldset>

          <fieldset>
            <legend className="ir">로그인</legend>
            <label htmlFor="pw" className="block text-[12px] text-[#767676] py-[4px]">
              비밀번호
            </label>
            <input id="pw" type="password" className="w-[322px] border-b-[1px] border-[#DBDBDB]" />
          </fieldset>

          <button className="btn-xl bg-[#FCD690] text-[#fff] mt-[30px] mb-[20px]">{btnName}</button>
        </form>
        <Link to="/join" className="text-[#767676] text-[12px] text-center">
          {option}
        </Link>
      </main>
    </div>
  );
};

export default LoginAndJoin;
