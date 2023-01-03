import { useNavigate } from "react-router-dom";

export const HeaderChat = ({ onModalInfo }) => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  const moreVertical = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-large.png`;
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
      {/* 아래 텍스트는 유저 이름을 porps로 전달받습니다. */}
      <span className="ml-[1rem] mr-auto text-[1.4rem]">안녕하세요. 환영합니다.</span>

      {/* 아래 버튼에는 모달 이벤트가 들어가야 합니다. */}
      <button className="w-[2.4rem] h-[2.4rem] my-[1.2rem]" type="button" onClick={onModalInfo}>
        <img src={moreVertical} alt="더보기" />
      </button>
    </header>
  );
};
