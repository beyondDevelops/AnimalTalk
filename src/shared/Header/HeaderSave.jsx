import { useNavigate } from "react-router-dom";

export const HeaderSave = () => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  let navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-[1.6rem]">
      <button
        className="w-[2.2rem] h-[2.2rem]"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img className="" src={arrowLeft} alt="뒤로가기" />
      </button>
      <button className="btn-md bg-s-color text-[1.4rem] text-[#fff] my-[0.8rem]">저장</button>
    </header>
  );
};
