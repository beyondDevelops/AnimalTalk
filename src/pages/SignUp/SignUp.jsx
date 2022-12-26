import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isWrong, setIswrong] = useState(true);
  const [emailLength, setEmailLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnColor, setBtnColor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (emailLength >= 1 && passwordLength >= 6) {
      setBtnColor(true);
      setBtnDisabled(false);
    } else {
      setBtnColor(false);
      setBtnDisabled(true);
    }
  }, [emailLength, passwordLength]);

  const handleEmailLength = () => {
    setEmailLength(emailRef.current.value.length);
  };

  const handlePasswordLength = () => {
    setPasswordLength(passwordRef.current.value.length);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/user/emailvalid",
        JSON.stringify({
          user: {
            email: emailRef.current.value,
          },
        })
      );
      if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");
      if (res.data.message === "이미 가입된 이메일 주소 입니다.") {
        setIswrong(!isWrong);
        return;
      }

      navigate("/signup/profile");
      localStorage.setItem("email", emailRef.current.value);
      localStorage.setItem("password", passwordRef.current.value);
    } catch (err) {
      setIswrong(!isWrong);
      console.log(err.response.status);
      console.log(err.statement);
    }
  };

  return (
    <div className="page">
      <main className="w-[39rem] h-screen mx-auto bg-white flex flex-col">
        <h1 className="pt-[3rem] pb-[4rem] text-center text-[2.4rem] font-medium">이메일로 회원가입</h1>
        <form action="" className="flex flex-col items-center" onSubmit={handleSignupSubmit}>
          <fieldset className="mb-[1.6rem]">
            <legend className="ir">이메일</legend>

            <label htmlFor="emailId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              이메일
            </label>
            <input
              placeholder=""ex. animal@talk.com""
              required
              ref={emailRef}
              onChange={handleEmailLength}
              id="emailId"
              type="email"
              pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"
              className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
            />
            {isWrong ? null : (
              <p className="absolute font-normal text-[1.2rem] text-[#EB5757] mt-[0.6rem]">
                * 이미 가입된 이메일 주소입니다.
              </p>
            )}
          </fieldset>

          <fieldset className="mt-[1.5rem]">
            <legend className="ir">비밀번호</legend>
            <label htmlFor="pw" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              비밀번호
            </label>
            <input
              placeholder="6자리 이상 입력해주세요."
              required
              ref={passwordRef}
              onChange={handlePasswordLength}
              id="pw"
              type="password"
              className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
              // onChange={}
            />
          </fieldset>

          <button
            disabled={btnDisabled}
            className={`btn-xl ${btnColor ? "btn-on" : "btn-off"} text-[#fff] mt-[6rem] mb-[2rem] text-center`}
          >
            다음
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
