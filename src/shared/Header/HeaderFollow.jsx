import { useNavigate } from "react-router-dom";

export const HeaderFollow = ({ title }) => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;

  let navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-[1.6rem] border-b-cst-ligth-gray border-b-[0.1rem]">
      <button
        className="w-[2.2rem] h-[2.2rem]"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={arrowLeft} alt="뒤로가기" />
      </button>
      <span className="ml-[1rem] mr-auto text-[1.4rem] py-[1.5rem]">{title}</span>
    </header>
  );
};
