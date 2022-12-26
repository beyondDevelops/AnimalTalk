import React, { useState, useRef } from "react";

const ModalPostImg = ({ imgArr, modal, onModalToggle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);

  const handleModalCarousel = (el) => {
    if (el.dataset.name === "prev") {
      if (imgArr[currentIndex - 1]) {
        setCurrentIndex((idx) => idx - 1);
      } else {
        setCurrentIndex((idx) => idx);
      }
    } else if (el.dataset.name === "next") {
      if (imgArr[currentIndex + 1]) {
        setCurrentIndex((idx) => idx + 1);
      } else {
        setCurrentIndex((idx) => idx);
      }
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen grid place-items-center transition-all ease-linear duration-1000 bg-gray-800 bg-opacity-50 ${
        modal ? "visible z-10" : "invisible -z-10"
      }`}
    >
      <button
        className={`absolute top-[50%] left-[6%] min-[391px]:left-[10%] lg:left-[25%] z-30 ${
          imgArr.length > 1 ? "bg-[#ffffffdb] hover:text-black" : "bg-[#ffffff00]"
        } leading-[100%] w-[3rem] h-[3rem] text-[3rem] text-cst-gray rounded-[50%] cursor-pointer`}
        type="button"
        aria-label="prev"
        data-name="prev"
        onClick={(e) => handleModalCarousel(e.target)}
        ref={leftArrow}
      >
        &lt;
      </button>
      <section className="w-[70%] items-center grid place-items-center overflow-hidden relative">
        <h3 className="ir">이미지</h3>
        <div className="relative flex flex-row h-full overflow-x-scroll scrollbar-hide">
          <img
            src={`https://mandarin.api.weniv.co.kr/${imgArr[currentIndex]}`}
            alt=""
            className="min-w-full object-contain"
          />
          <button
            type="button"
            className="absolute top-[1rem] right-[1rem] text-[2.4rem] font-bold bg-transparent border-transparent text-[#fff] cursor-pointer transition-all ease-linear duration-300 hover:text-m-color hover:scale-125"
            onClick={onModalToggle}
          >
            X
          </button>
        </div>
      </section>
      <button
        className={`absolute top-[50%] right-[6%] min-[391px]:right-[10%] lg:right-[25%] z-30 ${
          imgArr.length > 1 ? "bg-[#ffffffdb] hover:text-black" : "bg-[#ffffff00]"
        } leading-[100%] w-[3rem] h-[3rem] text-[3rem] text-cst-gray rounded-[50%] cursor-pointer`}
        type="button"
        aria-label="next"
        data-name="next"
        onClick={(e) => handleModalCarousel(e.target)}
        ref={rightArrow}
      >
        &gt;
      </button>
    </div>
  );
};

export default ModalPostImg;
