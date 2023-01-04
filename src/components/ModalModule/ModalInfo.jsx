import React from "react";
const ModalInfo = ({ onModalAction, onModalInfo, contentOne, contentTwo, modalRef }) => {
  return (
    <section onClick={onModalInfo} ref={modalRef} className="absolute inset-0">
      <h2 className="ir">모달 설정창</h2>
      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#fff] w-[39rem] rounded-t-[10px] mx-auto shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]">
        <button className="bg-[#DBDBDB] border-[2px] rounded-[5px] block w-[5rem] mx-auto my-[1.6rem]"></button>
        <button
          onClick={() => {
            alert("준비중입니다.");
          }}
          className="block p-[1.25rem] w-[100%] text-left pl-[2.6rem] hover:bg-s-color"
        >
          {contentOne}
        </button>
        {contentTwo ? (
          <button
            onClick={onModalAction}
            className="border-t-[1px] p-[1.25rem]  w-[100%] text-left pl-[2.6rem] hover:bg-s-color"
          >
            {contentTwo}
          </button>
        ) : null}
      </div>
    </section>
  );
};
export default ModalInfo;
