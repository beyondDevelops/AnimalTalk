import React, { useState, useRef } from "react";

const ModalPostImg = ({ imgArr, setModalPostImage }) => {
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

  const modalRef = useRef();
  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setModalPostImage(false);
    }
  };
  console.log(imgArr);

  return (
    <section className="absolute inset-0 z-10" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">게시글 사진 모달</h3>

      <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[39rem] h-[60%] rounded-t-[10px] bg-slate-100/60">
        <button
          type="button"
          aria-label="닫기창"
          className="relative w-[100%] h-[3.6rem] border-b-[0.5rem] border-b-s-color/80 before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-s-color before:hover:bg-m-color"
          onClick={() => {
            setModalPostImage(false);
          }}
        ></button>

        {/* 이미지 캐러셀 버튼 */}
        {imgArr.length > 1 ? (
          <div className="relative">
            <button
              className="absolute top-[13rem] left-[2%] w-[3rem] h-[3rem] text-[2rem] text-m-color bg-s-color/60 rounded-full hover:bg-m-color hover:text-s-color"
              type="button"
              aria-label="prev"
              data-name="prev"
              onClick={(e) => handleModalCarousel(e.target)}
              ref={leftArrow}
            >
              &lt;
            </button>
            <button
              className="absolute top-[13rem] right-[2%] w-[3rem] h-[3rem] text-[2rem] text-m-color bg-s-color/60 rounded-full hover:bg-m-color hover:text-s-color"
              type="button"
              aria-label="next"
              data-name="next"
              onClick={(e) => handleModalCarousel(e.target)}
              ref={rightArrow}
            >
              &gt;
            </button>
          </div>
        ) : (
          <></>
        )}

        {/* 이미지 캐러셀 */}
        <div className="relative mx-auto my-[2rem] overflow-hidden w-[30.4rem] h-[22.8rem] rounded-[10px]">
          <div className=" flex flex-row h-full overflow-x-scroll scrollbar-hide">
            <img
              src={
                imgArr[currentIndex].includes("https")
                  ? imgArr[currentIndex]
                  : `https://mandarin.api.weniv.co.kr/${imgArr[currentIndex]}`
              }
              alt=""
              className="min-w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalPostImg;
