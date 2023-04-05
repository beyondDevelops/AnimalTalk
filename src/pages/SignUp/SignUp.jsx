import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import useLengthCheck from "../../hooks/useLengthCheck";

const Signup = () => {
  const navigate = useNavigate();

  const inputRef = useRef([]);

  const [isWrong, setIswrong] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isActive] = useLengthCheck(Object.keys(inputRef.current), inputRef);

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
  );
};

export default Signup;
