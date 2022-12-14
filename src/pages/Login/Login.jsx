import LoginBtn from "../../components/LoginBtn/LoginBtn";

const Login = () => {
  const loginImg = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const kakaoImg = `${process.env.PUBLIC_URL}/assets/img/logo-kakao.png`;
  const googleImg = `${process.env.PUBLIC_URL}/assets/img/logo-google.png`;
  const faceBookImg = `${process.env.PUBLIC_URL}/assets/img/logo-facebook.png`;

  return (
    <main className="page">
      <div className="bg-cyan-300 basis-full">
        <img src={loginImg} alt="" className="w-[145px] h-[200px] my-[50%] mx-[auto]" />
      </div>
      <article className="bg-slate-200 h-3/5">
        <ul className="flex flex-col items-center">
          <LoginBtn img={kakaoImg} text="카카오톡 계정으로 로그인" mt="mt-[50px]" border="#F2C94C" />
          <LoginBtn img={googleImg} text="구글 계정으로 로그인" mt="mt-[10px]" border="#767676" />
          <LoginBtn img={faceBookImg} text="페이스북 계정으로 로그인" mt="mt-[10px]" border="#2D9CDB" />
        </ul>
        <ul className="flex justify-center gap-[28px] mt-[20px] text-[#767676] text-[12px]">
          {/* 추후에 버튼을 링크로 바꿀 예정입니다. */}
          <button>
            <li>이메일로 로그인</li>
          </button>
          <button>
            <li>회원가입</li>
          </button>
        </ul>
      </article>
    </main>
  );
};

export default Login;
