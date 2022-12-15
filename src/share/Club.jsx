import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Club = (/* props */) => {
  /* Note: 실제로 API를 통해 받아오는 데이터는 다를 수 있습니다. */
  /* Note: 데이터가 없는 경우 즉 참여하는 클럽이 없을 경우에 대한 예외처리가 필요합니다. */

  /* scroll Button 기능을 구현하기 위해 사용된 코드입니다. */
  const elRef = useRef(null);
  const [arrowDisabled, setArrowDisabled] = useState(true);

  const handleHorizontalScroll = (el, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      el.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (el.scrollLeft === 0) {
        setArrowDisabled(true);
      } else {
        setArrowDisabled(false);
      }
    }, speed);
  };

  return (
    <section className="bg-sky-300 relative px-[16px] py-[20px]">
      <h2 className="mb-[16px]">참여 중인 산책</h2>
      <ul className="flex flex-row overflow-hidden overflow-x-scroll scrollbar-hide" ref={elRef}>
        {/* 별도의 컴포넌트로 분리시킬 예정*/}
        <li className="w-[140px] mr-[10px]">
          <Link to="/:club">
            <img
              className="w-full h-[90px] object-cover border-[0.5px] border-[#dbdbdb] rounded-[8px]"
              src="https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
            <strong className="block mt-[6px] mx-[2px] text-[14px] leading-[18px] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
              한강에서 원반 던지면 놀기
            </strong>
            <span className="block mt-[4px] mx-[2px] text-[12px] leading-[15px] font-bold text-[#EDA751]">
              35,000원
            </span>
          </Link>
        </li>
        <li className="w-[140px] mr-[10px]">
          <Link to="/:club">
            <img
              className="w-full h-[90px] object-cover border-[0.5px] border-[#dbdbdb] rounded-[8px]"
              src="https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
            <strong className="block mt-[6px] mx-[2px] text-[14px] leading-[18px] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
              한강에서 원반 던지면 놀기
            </strong>
            <span className="block mt-[4px] mx-[2px] text-[12px] leading-[15px] font-bold text-[#EDA751]">
              35,000원
            </span>
          </Link>
        </li>
        <li className="w-[140px] mr-[10px]">
          <Link to="/:club">
            <img
              className="box-border w-full h-[90px] object-cover border-[0.5px] border-[#dbdbdb] rounded-[8px]"
              src="https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
            <strong className="block mt-[6px] mb-[4px] mx-[2px] text-[14px] leading-[18px] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
              한강에서 원반 던지면 놀기
            </strong>
            <span className="block mx-[2px] text-[12px] leading-[15px] font-bold text-[#EDA751]">35,000원</span>
          </Link>
        </li>
        <li className="w-[140px] mr-[10px]">
          <Link to="/:club">
            <img
              className="w-full h-[90px] object-cover border-[0.5px] border-[#dbdbdb] rounded-[8px]"
              src="https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
            <strong className="block mt-[6px] mx-[2px] text-[14px] leading-[18px] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
              한강에서 원반 던지면 놀기
            </strong>
            <span className="block mt-[4px] mx-[2px] text-[12px] leading-[15px] font-bold text-[#EDA751]">
              35,000원
            </span>
          </Link>
        </li>
      </ul>
      <div className="relative top-[-90px] flex justify-between w-full">
        <button
          className="absolute z-10 left-[-10px] bg-[#0000005d] leading-[100%] w-[30px] h-[30px] text-[30px] text-[#ffffff9a] rounded-[50%] cursor-pointer"
          type="button"
          aria-label="prev"
          onClick={() => handleHorizontalScroll(elRef.current, 25, 140, -10)}
          disabled={arrowDisabled}
        >
          &lt;
        </button>
        <button
          className="absolute z-10 right-[-10px] bg-[#0000005d] leading-[100%] w-[30px] h-[30px] text-[30px] text-[#ffffff9a] rounded-[50%] cursor-pointer"
          type="button"
          aria-label="next"
          onClick={() => handleHorizontalScroll(elRef.current, 25, 140, 10)}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Club;
