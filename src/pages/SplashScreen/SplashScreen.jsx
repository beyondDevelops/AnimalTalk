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
    }, 2500);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className="mt-auto animate-fade-in">
      <main className="flex justify-center items-center h-screen">
        <img src={splashImg} alt="" className="w-[14.5rem] mx-auto h-[20.2rem]" />
      </main>
    </div>
  );
};
export default SplashScreen;
