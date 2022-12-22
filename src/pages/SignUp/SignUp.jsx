import React from "react";

const Signup = () => {
  return (
    <div className="page">
      <main className="w-[39rem] h-screen mx-auto bg-white flex flex-col">
        <h1 className="pt-[3rem] pb-[4rem] text-center text-[2.4rem] font-medium">회원가입</h1>
        <form action="" className="flex flex-col items-center ">
          <fieldset className="mb-[1.6rem]">
            <legend className="ir">로그인</legend>

            <label htmlFor="emailId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              이메일
            </label>
            <input
              required
              id="emailId"
              type="email"
              className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
            />
          </fieldset>

          <fieldset>
            <legend className="ir">로그인</legend>
            <label htmlFor="pw" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              비밀번호
            </label>
            <input
              required
              id="pw"
              type="password"
              className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
              // onChange={}
            />
          </fieldset>

          <button className="btn-xl bg-s-color text-[#fff] mt-[3rem] mb-[2rem] text-center">회원가입</button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
