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
    },
    {
      id: "google",
      imgUrl: googleImg,
      color: "border-[#767676]",
      text: "카카오톡 계정으로 로그인",
    },
    {
      id: "facebook",
      imgUrl: faceBookImg,
      color: "border-[#2D9CDB]",
      text: "카카오톡 계정으로 로그인",
    },
  ];

  return (
    <main className="page">
      <div className="bg-cyan-300 h-3/5 flex justify-center items-center">
        <img src={loginImg} alt="애니멀톡" className="w-[145px] h-[200px]" />
      </div>
      <article className="bg-slate-200 h-2/5 shrink-0">
        <ul className>
          {loginBtnStyles.map((item) => (
            <LoginBtn id={item.id} img={item.imgUrl} borderColor={item.color} text={item.text} />
          ))}
          <Link className="inline-block" to="/login/email">
            이메일로 로그인
          </Link>
        </ul>
        {/* <div className="flex justify-center gap-[28px] mt-[10px] text-[#767676] text-[12px]"> */}
        <Link className="" to="/join">
          회원가입
        </Link>
        {/* </div> */}
      </article>
    </main>
  );
};

export default Login;
