import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginAndSignup = ({ name, btnName, option }) => {
  const test = useLocation();
  return (
    <div className="page">
      <main className="w-[39rem] h-screen mx-auto bg-white flex flex-col">
        <h1 className="pt-[3rem] pb-[4rem] text-center text-[2.4rem] font-medium">{name}</h1>
        <form action="" className="flex flex-col items-center ">
          <fieldset className="mb-[1.6rem]">
            <legend className="ir">로그인</legend>

            <label htmlFor="emailId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              이메일
            </label>
            <input id="emailId" type="email" className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray" />
          </fieldset>

          <fieldset>
            <legend className="ir">로그인</legend>
            <label htmlFor="pw" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              비밀번호
            </label>
            <input id="pw" type="password" className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray" />
          </fieldset>

          <Link
            to={test.pathname === "/login/email" ? "/home" : "/signup/profile"}
            className="btn-xl bg-s-color text-[#fff] mt-[3rem] mb-[2rem] text-center"
          >
            {btnName}
          </Link>
        </form>
        <Link to="/signup" className="text-cst-gray text-[1.2rem] text-center">
          {option}
        </Link>
      </main>
    </div>
  );
};

export default LoginAndSignup;
