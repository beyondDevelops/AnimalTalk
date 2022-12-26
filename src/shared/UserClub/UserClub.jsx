import { useRef, useState } from "react";
import SimpleClub from "../../components/SimpleClub/SimpleClub";

const UserClub = ({ club }) => {
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
    <section className="relative px-[1.6rem] py-[2rem]">
      <h2 className="mb-[1.6rem]">참여 중인 산책</h2>
      <ul className="flex flex-row overflow-hidden overflow-x-scroll scrollbar-hide" ref={elRef}>
        {club.length > 0 ? (
          club.map((item) => <SimpleClub key={item.id} data={item} />)
        ) : (
          <li className="shrink-0 mr-[1rem] overflow-hidden text-m-color">현재 참여 중인 산책 모임이 없습니다.</li>
        )}
      </ul>
      {club.length > 0 && (
        <div className="relative top-[-9rem] flex justify-between w-full">
          <button
            className="absolute z-10 left-[-1rem] bg-[#0000005d] leading-[100%] w-[3rem] h-[3rem] text-[3rem] text-[#ffffff9a] rounded-[50%] cursor-pointer"
            type="button"
            aria-label="prev"
            onClick={() => handleHorizontalScroll(elRef.current, 25, 140, -10)}
            disabled={arrowDisabled}
          >
            &lt;
          </button>
          <button
            className="absolute z-10 right-[-1rem] bg-[#0000005d] leading-[100%] w-[3rem] h-[3rem] text-[3rem] text-[#ffffff9a] rounded-[50%] cursor-pointer"
            type="button"
            aria-label="next"
            onClick={() => handleHorizontalScroll(elRef.current, 25, 140, 10)}
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  );
};

export default UserClub;
