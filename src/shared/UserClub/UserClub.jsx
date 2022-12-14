import { useState, useRef, useCallback } from "react";
import SimpleClub from "../../components/SimpleClub/SimpleClub";
import UserClubModal from "./UserClubModal";

const UserClub = ({ club, setIsUpload }) => {
  const ulRef = useRef(null);
  const [leftBtnVisible, setLeftBtnVisible] = useState(false);
  const [rightBtnVisible, setRightBtnVisible] = useState(true);

  const handleHorizontalScroll = (el, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      el.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const handleArrowBtnVisibility = (currentPosX) => {
    if (currentPosX <= 0) {
      setLeftBtnVisible(false);
      setRightBtnVisible(true);
    } else if (currentPosX >= ulRef.current.scrollWidth - (ulRef.current.clientWidth + 2)) {
      setLeftBtnVisible(true);
      setRightBtnVisible(false);
    } else if (currentPosX > 0 && currentPosX < ulRef.current.scrollWidth - (ulRef.current.clientWidth + 2)) {
      setLeftBtnVisible(true);
      setRightBtnVisible(true);
    }
  };

  const comma = useCallback((money) => {
    return money
      .toString()
      .split("")
      .reverse("")
      .map((val, idx) => (idx % 3 === 0 && idx !== 0 ? val + "," : val))
      .reverse()
      .join("");
  }, []);

  const [isClubModal, setIsClubModal] = useState(false);
  const [clubData, setClubData] = useState();

  return (
    <>
      <section className="relative px-[1.6rem] py-[2rem]">
        <h2 className="mb-[1.6rem]">참여 중인 모임</h2>
        <ul className="flex flex-row overflow-hidden overflow-x-scroll scrollbar-hide" ref={ulRef}>
          {club.length > 0 ? (
            club.map((item) => (
              <SimpleClub key={item.id} data={item} {...{ setIsClubModal }} {...{ setClubData }} {...{ comma }} />
            ))
          ) : (
            <li className="shrink-0 mr-[1rem] overflow-hidden text-m-color">현재 참여 중인 산책 모임이 없습니다.</li>
          )}
        </ul>
        {club.length > 2 && (
          <div className="relative top-[-9rem] flex justify-between w-full">
            <button
              className={`absolute z-10 left-[-1rem] ${
                leftBtnVisible ? "visible" : "hidden"
              } bg-[#0000005d] leading-[100%]  w-[3rem] h-[3rem] text-[2rem] text-m-color rounded-full hover:bg-m-color hover:text-s-color`}
              type="button"
              aria-label="prev"
              onClick={() => {
                handleHorizontalScroll(ulRef.current, 25, 150, -10);
                handleArrowBtnVisibility(ulRef.current.scrollLeft - 150);
              }}
            >
              &lt;
            </button>
            <button
              className={`absolute z-10 right-[-1rem] ${
                rightBtnVisible ? "visible" : "hidden"
              } bg-[#0000005d] leading-[100%]  w-[3rem] h-[3rem] text-[2rem] text-m-color rounded-full hover:bg-m-color hover:text-s-color`}
              type="button"
              aria-label="next"
              onClick={() => {
                handleHorizontalScroll(ulRef.current, 25, 150, 10);
                handleArrowBtnVisibility(ulRef.current.scrollLeft + 150);
              }}
            >
              &gt;
            </button>
          </div>
        )}
      </section>
      {isClubModal ? (
        <UserClubModal {...{ setIsClubModal }} {...{ clubData }} {...{ comma }} {...{ setIsUpload }} />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserClub;
