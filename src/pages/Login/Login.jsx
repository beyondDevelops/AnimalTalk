import LoginBtn from "../../components/LoginBtn/LoginBtn";
import { Link } from "react-router-dom";

const Login = () => {
  const loginImg = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const kakaoImg = `${process.env.PUBLIC_URL}/assets/img/logo-kakao.png`;
  const googleImg = `${process.env.PUBLIC_URL}/assets/img/logo-google.png`;
  const faceBookImg = `${process.env.PUBLIC_URL}/assets/img/logo-facebook.png`;

  const loginBtnStyles = [
    {
      id: "kakao",
      imgUrl: kakaoImg,
      color: "border-[#F2C94C]",
      text: "카카오톡 계정으로 로그인",
      mt: "mt-[50px]",
    },
    {
      id: "google",
      imgUrl: googleImg,
      color: "border-[#767676]",
      text: "카카오톡 계정으로 로그인",
      mt: "mt-[10px]",
    },
    {
      id: "facebook",
      imgUrl: faceBookImg,
      color: "border-[#2D9CDB]",
      text: "카카오톡 계정으로 로그인",
      mt: "mt-[10px]",
    },
  ];

  return (
    <main className="page">
      <div className="bg-cyan-300 basis-full">
        <img src={loginImg} alt="" className="w-[145px] h-[200px] my-[50%] mx-[auto]" />
      </div>
      <article className="bg-slate-200 h-3/5">
        <ul className="flex flex-col items-center">
          {loginBtnStyles.map((item) => (
            <LoginBtn id={item.id} img={item.imgUrl} borderColor={item.color} text={item.text} mt={item.mt} />
          ))}
        </ul>
        <div className="flex justify-center gap-[28px] mt-[20px] text-[#767676] text-[12px]">
          <Link to="/login/email">
            <button>이메일로 로그인</button>
          </Link>
          <Link to="/join">
            <button>회원가입</button>
          </Link>
        </div>
      </article>
    </main>
  );
};

export default Login;
