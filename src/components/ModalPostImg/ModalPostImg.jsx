import React from "react";

const ModalPostImg = ({ img, modal, onModalToggle }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen grid place-items-center transition-all ease-linear duration-1000 visible z-10 bg-gray-800 bg-opacity-50 ${
        modal ? "visible z-10" : "invisible -z-10"
      }`}
    >
      <section className="min-w-fit items-center grid place-items-center relative">
        <h3 className="ir">이미지</h3>
        <img src={img} alt="" />
        <button
          type="button"
          className="absolute top-[1rem] right-[1rem] text-[2rem] bg-transparent border-transparent text-cst-gray cursor-pointer transition-all ease-linear duration-300 hover:text-red-400 hover:scale-125"
          onClick={onModalToggle}
        >
          X
        </button>
      </section>
    </div>
  );
};

export default ModalPostImg;
