import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderBasic = ({ onModalInfo }) => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  const moreVertical = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-large.png`;
  let navigate = useNavigate();
  return (
    <header className="flex justify-between items-center pl-[1.6rem] pr-[1.2rem]">
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

const HeaderSearch = () => {
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
            className="w-[316px] bg-[#F2F2F2] rounded-[32px] px-[16px] py-[7px] text-[1.4rem] focus:border"
            placeholder="계정 검색"
          />
        </fieldset>
      </form>
    </header>
  );
};

const HeaderFeed = () => {
  const search = `${process.env.PUBLIC_URL}/assets/img/icon-search.png`;
  return (
    <header className="flex justify-between items-center px-[1.6rem]">
      <span className="text-[18px] font-medium">애니멀톡 피드</span>
      {/* button을 Link로 바꾸어 serach페이지로 이동해야합니다. */}
      <button className="w-[2.4rem] h-[2.4rem] my-[1.2rem]" type="button">
        <img src={search} alt="검색하기" />
      </button>
    </header>
  );
};

const HeaderSave = () => {
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
      <button className="btn-md bg-[#FCD690] text-[1.4rem] text-[#fff] my-[0.8rem]">저장</button>
    </header>
  );
};

const HeaderChat = () => {
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
      <span className="ml-[10px] mr-auto text-[1.4rem]">안녕하세요. 환영합니다.</span>

      {/* 아래 버튼에는 모달 이벤트가 들어가야 합니다. */}
      <button className="w-[2.4rem] h-[2.4rem] my-[1.2rem]" type="button">
        <img src={moreVertical} alt="더보기" />
      </button>
    </header>
  );
};

export { HeaderBasic, HeaderSearch, HeaderFeed, HeaderSave, HeaderChat };
