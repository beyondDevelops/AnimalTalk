import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const notFoundImg = `${process.env.PUBLIC_URL}/assets/img/char-404-cat.svg`;
  const navigate = useNavigate();

  return (
    <>
      <img
        src={notFoundImg}
        alt="페이지를 찾을 수 없습니다."
        className="w-[18.5rem] h-[18.5rem] mt-[19.1rem] mx-[auto]"
      />
      <p className="text-center mt-[2.1rem] text-cst-gray">페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn-on w-[12rem] p-[1.2rem] rounded-[44px] mx-[auto] text-[#fff] mt-[2rem]"
      >
        이전 페이지
      </button>
    </>
  );
};

export default NotFound;
