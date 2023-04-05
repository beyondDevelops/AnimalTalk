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
    }, 2200);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className="animate-fade-in">
      <main className="flex">
        <img src={splashImg} alt="" className="w-[14.5rem] mx-auto h-[20.2rem] my-[auto]" />
      </main>
      <div className="h-[49.5rem] bg-s-color"></div>
    </div>
  );
};
export default SplashScreen;
