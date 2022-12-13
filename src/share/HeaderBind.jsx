import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderBasic = () => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  const moreVertical = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-large.png`;
  let navigate = useNavigate();

  return (
    <header className="w-[390px] bg-emerald-300 h-[48px] flex justify-between items-center">
      <button
        type="type"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          src={arrowLeft}
          alt="뒤로가기"
          className="w-[22px] h-[22px] ml-[18px]"
        />
      </button>

      {/* 아래 버튼에는 모달 이벤트가 들어가야 합니다. */}
      <button type="button">
        <img
          src={moreVertical}
          alt="더보기"
          className="w-[24px] h-[24px] mr-[12px]"
        />
      </button>
    </header>
  );
};

const HeaderSearch = () => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  let navigate = useNavigate();

  return (
    <header className="w-[390px] bg-emerald-300 h-[48px] flex justify-between items-center">
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          src={arrowLeft}
          alt="뒤로가기"
          className="w-[22px] h-[22px] ml-[18px]"
        />
      </button>

      <form action="">
        <fieldset>
          <legend className="ir">검색창</legend>
          <label htmlFor="search"></label>
          <input
            id="search"
            type="text"
            className="w-[316px] h-[32px] bg-[#F2F2F2] rounded-[32px] mr-[19px] px-[16px] py-[7px] focus:borde"
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
    <header className="w-[390px] bg-sky-300 h-[48px] flex justify-between items-center">
      <span className="ml-[16px] text-[18px] font-medium">애니멀톡 피드</span>
      {/* button을 Link로 바꾸어 serach페이지로 이동해야합니다. */}
      <button type="button">
        <img
          src={search}
          alt="검색하기"
          className="w-[16px] h-[16px] mr-[17px]"
        />
      </button>
    </header>
  );
};

const HeaderSave = () => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  let navigate = useNavigate();

  return (
    <header className="w-[390px] bg-sky-300 h-[48px] flex justify-between items-center">
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          className="w-[22px] h-[22px] ml-[18px]"
          src={arrowLeft}
          alt="뒤로가기"
        />
      </button>
      <button className="btn-md bg-[#FCD690] text-[#fff] mr-[16px]">
        저장
      </button>
    </header>
  );
};

const HeaderChat = () => {
  const arrowLeft = `${process.env.PUBLIC_URL}/assets/img/icon-arrow-left.png`;
  const moreVertical = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-large.png`;
  let navigate = useNavigate();

  return (
    <header className="w-[390px] bg-emerald-300 h-[48px] flex justify-between items-center">
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          src={arrowLeft}
          alt="뒤로가기"
          className="w-[22px] h-[22px] ml-[18px]"
        />
      </button>
      {/* 아래 텍스트는 유저 이름을 porps로 전달받습니다. */}
      <span className="ml-[15px] basis-full">안녕하세요. 환영합니다.</span>

      {/* 아래 버튼에는 모달 이벤트가 들어가야 합니다. */}
      <button type="button">
        <img
          src={moreVertical}
          alt="더보기"
          className="w-[24px] h-[24px] mr-[12px]"
        />
      </button>
    </header>
  );
};

export { HeaderBasic, HeaderSearch, HeaderFeed, HeaderSave, HeaderChat };
