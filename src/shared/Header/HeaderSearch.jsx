import { useNavigate } from "react-router-dom";

export const HeaderSearch = () => {
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
        <img src={arrowLeft} alt="뒤로가기" />
      </button>

      <form action="" className="py-[0.8rem]">
        <fieldset>
          <legend className="ir">검색창</legend>
          <label htmlFor="search"></label>
          <input
            id="search"
            type="text"
            className="w-[31.6rem] bg-[#F2F2F2] rounded-[32px] px-[1.6rem] py-[0.7rem] text-[1.4rem] focus:border"
            placeholder="계정 검색"
          />
        </fieldset>
      </form>
    </header>
  );
};
