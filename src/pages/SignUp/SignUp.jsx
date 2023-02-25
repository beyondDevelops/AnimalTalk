import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const inputRef = useRef([]);

  const [isWrong, setIswrong] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isActive, setIsActive] = useState(false);

  const leastLength = {
    emailleast: 1,
    passwordleast: 6,
  };

  useEffect(() => {
    inputRef.current["email"].focus();
  }, []);

  const handleFormData = (e) => {
    if (e.target.id === "email") {
      setFormData({ ...formData, email: inputRef.current["email"].value });
    } else if (e.target.id === "password") {
      setFormData({ ...formData, password: inputRef.current["password"].value });
    }
  };

  const handleEmailLengthCheck = () => {
    if (inputRef.current["email"].value.length < leastLength.emailleast) {
      return false;
    }
    return true;
  };

  const handlePasswordLengthCheck = () => {
    if (inputRef.current["password"].value.length < leastLength.passwordleast) {
      return false;
    }
    return true;
  };

  const handleBtnControl = () => {
    const emailValidationResult = handleEmailLengthCheck();
    const passwordValidationResult = handlePasswordLengthCheck();

    if (emailValidationResult && passwordValidationResult) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: formData.email,
      password: formData.password,
    };
    console.log(userInfo);

    try {
      const res = await api.post(
        "/user/emailvalid",
        JSON.stringify({
          user: {
            email: formData.email,
          },
        })
      );
      if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");
      if (res.data.message === "이미 가입된 이메일 주소 입니다.") {
        setIswrong(!isWrong);
        return;
      }

      navigate("/signup/profile", {
        state: {
          userInfo,
        },
      });
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
              required
              id="email"
              type="email"
              ref={(el) => (inputRef.current["email"] = el)}
              placeholder="ex. animal@talk.com"
              onChange={(e) => {
                handleFormData(e);
                handleEmailLengthCheck();
                handleBtnControl();
              }}
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
              required
              id="password"
              type="password"
              ref={(el) => (inputRef.current["password"] = el)}
              placeholder="6자리 이상 입력해주세요."
              onChange={(e) => {
                handleFormData(e);
                handlePasswordLengthCheck();
                handleBtnControl();
              }}
              className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
            />
          </fieldset>

          <button
            disabled={!isActive}
            className={`btn-xl ${isActive ? "btn-on" : "btn-off"} text-[#fff] mt-[6rem] mb-[2rem] text-center`}
          >
            다음
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
