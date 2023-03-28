import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import useLengthCheck from "../../hooks/useLengthCheck";

const LoginEmail = () => {
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

  const handleUserLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/user/login",
        JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
          },
        })
      );
      if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");
      if (res.data.status) {
        setIswrong(!isWrong);
        console.error(`${res.data.status}: ${res.data.message}`);
        return;
      }

      const accessToken = res.data.user.token;
      localStorage.setItem("token", accessToken);

      navigate("/home");
    } catch (err) {
      console.log(err.status);
      console.log(err.statement);
    }
  };

  return (
    <div className="page">
      <main className="w-[39rem] h-screen mx-auto bg-white flex flex-col">
        <h1 className="pt-[3rem] pb-[4rem] text-center text-[2.4rem] font-medium">로그인</h1>
        <form action="" className="flex flex-col items-center " onSubmit={handleUserLoginSubmit}>
          <fieldset className="mb-[1.6rem]">
            <legend className="ir">로그인</legend>
            <label htmlFor="emailId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              이메일
            </label>
            <input
              required
              id="email"
              type="email"
              ref={(el) => (inputRef.current["email"] = el)}
              onChange={(e) => {
                handleFormData(e);
                handleEmailLengthCheck();
                handleBtnControl();
              }}
              className="xs:w-[26rem] sm:w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
            />
          </fieldset>

          <fieldset className="mt-[1.5rem]">
            <legend className="ir">로그인</legend>
            <label htmlFor="pw" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              비밀번호
            </label>
            <input
              required
              id="password"
              type="password"
              ref={(el) => {
                inputRef.current["password"] = el;
              }}
              onChange={(e) => {
                handleFormData(e);
                handlePasswordLengthCheck();
                handleBtnControl();
              }}
              className="xs:w-[26rem] sm:w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
            />
            {isWrong ? null : (
              <p className="absolute font-normal text-[1.2rem] text-[#EB5757] mt-[0.6rem]">
                * 이메일 또는 비밀번호가 일치하지 않습니다.
              </p>
            )}
          </fieldset>

          <button
            disabled={!isActive}
            className={`btn-xl ${isActive ? "btn-on" : "btn-off"} text-[#fff] mt-[6rem] mb-[2rem] text-center`}
          >
            로그인
          </button>
        </form>
        <Link to="/signup" className="text-cst-gray text-[1.2rem] text-center">
          이메일로 회원가입
        </Link>
      </main>
    </div>
  );
};

export default LoginEmail;
