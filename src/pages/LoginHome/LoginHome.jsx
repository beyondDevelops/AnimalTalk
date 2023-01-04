import { Link } from "react-router-dom";

const LoginHome = () => {
  const loginImg = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const kakaoImg = `${process.env.PUBLIC_URL}/assets/img/logo-kakao.png`;
  const googleImg = `${process.env.PUBLIC_URL}/assets/img/logo-google.png`;
  const faceBookImg = `${process.env.PUBLIC_URL}/assets/img/logo-facebook.png`;
  const basicImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

  return (
    <section className="login-page">
      <h1 className="ir">메인 로그인 화면</h1>
      <div className="flex justify-center items-center h-[100%]">
        <img src={loginImg} alt="애니멀톡" className="w-[14.5rem] my-50%" />
      </div>
      <article className="bg-[#fff] rounded-t-[20px] relative">
        <h2 className="ir">로그인 하기</h2>
        <ul className="flex flex-col items-center h-[330px]">
          <li
            onClick={() => {
              alert("이메일로 로그인과 회원가입 버튼만 작동합니다.");
            }}
            className="first:mt-[5rem] mb-[1rem] last:mb-0"
          >
            <button className="rounded-[44px] min-w-[32rem] leading-[4.4rem] border-[#f2c94c] border-[1px] bg-white text-center relative text-cst-gray">
              <img
                src={kakaoImg}
                alt="카카오톡 계정으로 로그인"
                className="w-[1.8rem] inline absolute left-[2rem] top-[50%] translate-y-[-50%]"
              />
              카카오톡 계정으로 로그인
            </button>
          </li>
          <li
            onClick={() => {
              alert("이메일로 로그인과 회원가입 버튼만 작동합니다.");
            }}
            className="first:mt-[5rem] mb-[1rem] last:mb-0"
          >
            <button className="rounded-[44px] min-w-[32rem] leading-[4.4rem] border-cst-gray border-[1px] bg-white text-center relative text-cst-gray">
              <img
                src={googleImg}
                alt="구글 계정으로 로그인"
                className="w-[1.8rem] inline absolute left-[2rem] top-[50%] translate-y-[-50%]"
              />
              구글 계정으로 로그인
            </button>
          </li>
          <li
            onClick={() => {
              alert("이메일로 로그인과 회원가입 버튼만 작동합니다.");
            }}
            className="first:mt-[5rem] mb-[1rem] last:mb-0"
          >
            <button className="rounded-[44px] min-w-[32rem] leading-[4.4rem] border-[#2D9CDB] border-[1px] bg-white text-center relative text-cst-gray">
              <img
                src={faceBookImg}
                alt="페이스북 계정으로 로그인"
                className="w-[18px] inline absolute left-[20px] top-[50%] translate-y-[-50%]"
              />
              페이스북 계정으로 로그인
            </button>
          </li>
          <li className="first:mt-[5rem] mb-[1rem] last:mb-0">
            <Link
              to="/login/email"
              className="inline-block rounded-[44px] min-w-[32rem] leading-[4.4rem] border-[green] border-[1px] bg-white text-center relative text-cst-gray"
            >
              <img
                src={basicImg}
                alt="이메일로 로그인"
                className="w-[1.8rem] inline absolute left-[2rem] top-[50%] translate-y-[-50%]"
              />
              이메일로 로그인
            </Link>
          </li>
        </ul>
        <Link
          className="block text-center text-cst-gray absolute left-[50%] translate-x-[-50%] bottom-[3.5rem]"
          to="/signup"
        >
          회원가입
        </Link>
      </article>
    </section>
  );
};

export default LoginHome;
