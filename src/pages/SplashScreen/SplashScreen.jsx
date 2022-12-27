import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SplashScreen = () => {
  const splashImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;
  let navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  useEffect(() => {
    if (accessToken) {
      navigate("/home", { replace: true });
    }
    let time = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className="page">
      <main>
        <img src={splashImg} alt="" className="w-[14.5rem] h-[20rem] mx-[auto]" />
      </main>
    </div>
  );
};
export default SplashScreen;
