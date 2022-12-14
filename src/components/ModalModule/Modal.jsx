import React from "react";
import { useNavigate } from "react-router-dom";
const Modal = ({ content, value, onModalClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="absolute inset-0 z-20 bg-gray-800 bg-opacity-50">
      <h2 className="ir">로그아웃 창</h2>
      <div className="bg-[#fff] w-[25.2rem] h-[11rem] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-[10px] shadow-[0_0px_10px_-5px_rgba(0,0,0,0.8)]">
        <h3 className="text-center py-[2.2rem] font-medium">{content}</h3>
        <ul className="flex border-t-[1px]">
          <li className="basis-[12.6rem] text-center leading-[4.3rem] border-r-[1px]">
            {/* 아래의 함수를 수정 */}
            <button onClick={onModalClose} className="w-[100%]">
              취소
            </button>
          </li>
          <li className="basis-[12.6rem] text-center leading-[4.3rem] text-m-color">
            {value === "로그아웃" ? (
              // 이때 로그아웃 버튼을 클릭하면 Home으로 이동함과 동시에 userInfo를 false로 바꿔주면 될 것 같습니다.
              <button onClick={handleLogout} className="w-[100%] inline-block">
                {value}
              </button>
            ) : (
              <button className="w-[100%]">{value}</button>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
};
export default Modal;
