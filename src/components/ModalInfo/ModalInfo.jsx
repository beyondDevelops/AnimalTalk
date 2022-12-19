import React from "react";

const ModalInfo = ({ handleModalLogout, handleModalInfo, contentOne, contentTwo }) => {
  return (
    <div className="absolute bottom-0 bg-[#d4b886] w-[390px] h-[138px] rounded-t-[10px]">
      <button
        onClick={handleModalInfo}
        className="bg-[#DBDBDB] border-[2px] rounded-[5px] block w-[50px] mx-auto my-[16px]"
      ></button>
      <button className="block p-[12.5px] w-[100%] text-left pl-[26px]">{contentOne}</button>
      <button
        onClick={handleModalLogout}
        className="border-t-[1px] p-[12.5px]  w-[100%] text-left pl-[26px] hover:text-[#ff0000]"
      >
        {contentTwo}
      </button>
    </div>
  );
};

export default ModalInfo;
