import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginAndJoin = ({ name, btnName, option }) => {
  const test = useLocation();
  return (
    <div className="bg-lime-400">
      <main className="w-[390px] h-screen mx-auto bg-white flex flex-col">
        <h1 className="pt-[30px] pb-[40px] text-center text-[24px] font-medium">{name}</h1>
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

          <Link
            to={test.pathname === "/login/email" ? "/" : "/setting"}
            className="btn-xl bg-[#FCD690] text-[#fff] mt-[30px] mb-[20px] text-center"
          >
            {btnName}
          </Link>
        </form>
        <Link to="/join" className="text-[#767676] text-[12px] text-center">
          {option}
        </Link>
      </main>
    </div>
  );
};

export default LoginAndJoin;
