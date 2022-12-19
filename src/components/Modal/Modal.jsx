import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ content, value, handleModalLogout }) => {
  return (
    <div className="bg-[#d4b886] w-[252px] h-[110px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-[10px] z-10">
      <p className="text-center py-[22px] font-medium">{content}</p>
      <ul className="flex border-t-[1px]">
        <li className="basis-[126px] h-[43px] text-center leading-[43px] border-r-[1px]">
          <button onClick={handleModalLogout} className="w-[100%] hover:text-[#ff0000]">
            취소
          </button>
        </li>
        <li className="basis-[126px] h-[43px] text-center leading-[43px] hover:text-[#ff0000]">
          {content === "로그아웃하시겠어요?" ? (
            // 이때 로그아웃 버튼을 클릭하면 Home으로 이동함과 동시에 userInfo를 false로 바꿔주면 될 것 같습니다.
            <Link to="/" className="w-[100%] inline-block">
              {value}
            </Link>
          ) : (
            <button className="w-[100%]">{value}</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Modal;
