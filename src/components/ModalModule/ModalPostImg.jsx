import React, { useState, useRef } from "react";

const ModalPostImg = ({ imgArr, setModalPostImg, post }) => {
  const whiteAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const yellowAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

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
      setModalPostImg(false);
    }
  };

  return (
    <section className="absolute inset-0 z-10" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">게시글 사진 모달</h3>
      <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[39rem] h-[63%] rounded-t-[10px] bg-orange-200 overflow-auto scrollbar-hide">
        <button
          type="button"
          aria-label="닫기창"
          className="relative w-[100%] h-[3.6rem] border-b-[0.1rem] border-white before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-white before:hover:bg-m-color"
          onClick={() => {
            setModalPostImg(false);
          }}
        ></button>
        {/* 이미지 캐러셀 버튼 */}
        {imgArr.length > 1 ? (
          <div className="relative">
            <button
              className="absolute top-[13rem] left-[2%] w-[3rem] h-[3rem] text-[2rem] text-m-color bg-white rounded-full hover:bg-m-color hover:text-s-color"
              type="button"
              aria-label="prev"
              data-name="prev"
              onClick={(e) => handleModalCarousel(e.target)}
              ref={leftArrow}
            >
              &lt;
            </button>
            <button
              className="absolute top-[13rem] right-[2%] w-[3rem] h-[3rem] text-[2rem] text-m-color bg-white rounded-full hover:bg-m-color hover:text-s-color"
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
                  : `https://api.mandarin.weniv.co.kr/${imgArr[currentIndex]}`
              }
              alt=""
              className="min-w-full object-cover"
            />
          </div>
        </div>

        {/* 고양이 대화창 */}
        <ul>
          <li className="mb-[1rem]">
            <img
              src={whiteAnimalTalk}
              alt="노트북을 보는 하얀 고양이 애니몰톡 로고입니다."
              className="inline-block w-[4rem] h-[4rem] ml-[4rem]"
            />
            <p className="inline-block w-[26rem] ml-[0.5rem] text-black whitespace-nowrap overflow-ellipsis overflow-hidden align-middle">
              안녕, 애니멀톡을 이용해줘서 고마워...❤️
            </p>
          </li>

          <li className="mb-[1rem]">
            <img
              src={yellowAnimalTalk}
              alt="노트북을 보는 노란 고양이 애니몰톡 로고입니다."
              className="inline-block w-[4rem] h-[4rem] ml-[4rem]"
            />
            <p className="inline-block w-[26rem] ml-[0.5rem] text-black whitespace-nowrap overflow-ellipsis overflow-hidden align-middle">
              다음에도 놀러와 줄 거지..? 약속해죠..
            </p>
          </li>

          <li>
            <img
              src={post.author.image}
              alt={`${post.author.image}남의 프로필사진입니다.`}
              className="inline-block w-[3rem] h-[3rem] ml-[4.5rem] mb-[1rem] rounded-full object-cover"
            />
            <p className="inline-block w-[26rem] ml-[1rem] text-black whitespace-nowrap overflow-ellipsis overflow-hidde align-[0.4rem]">
              약속할게...💕
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ModalPostImg;
