import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const notFoundImg = `${process.env.PUBLIC_URL}/assets/img/char-404-cat.svg`;
  const navigate = useNavigate();

  return (
    <div className="page">
      <img src={notFoundImg} alt="페이지를 찾을 수 없습니다." className="w-[185px] h-[185px] mt-[191px] mx-[auto]" />
      <p className="text-center mt-[21px] text-[#767676]">페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn-on w-[12rem] p-[1.2rem] rounded-[44px] mx-[auto] text-[#fff] mt-[20px]"
      >
        이전 페이지
      </button>
    </div>
  );
};

export default NotFound;
