import { useNavigate } from "react-router-dom";

export const HeaderBasic = ({ onModalInfo }) => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  const moreVertical = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-large.png`;
  let navigate = useNavigate();
  return (
    <header className="flex justify-between items-center pl-[1.6rem] pr-[1.2rem] border-b-cst-ligth-gray border-b-[0.1rem]">
      <button
        className="w-[2.2rem] h-[2.2rem]"
        type="type"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={arrowLeft} alt="뒤로가기" />
      </button>
      {/* 아래 버튼에는 모달 이벤트가 들어가야 합니다. */}
      <button className="w-[2.4rem] h-[2.4rem] my-[1.2rem]" type="button" onClick={onModalInfo}>
        <img src={moreVertical} alt="더보기" />
      </button>
    </header>
  );
};
