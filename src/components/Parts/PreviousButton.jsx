import { useNavigate } from "react-router-dom";

export const PreviousButton = () => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  let navigate = useNavigate();

  return (
    <button
      className="w-[2.2rem] h-[2.2rem]"
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      <img src={arrowLeft} alt="뒤로가기" />
    </button>
  );
};
