import { useRef, useState } from "react";
import SimpleClub from "../components/SimpleClub/SimpleClub";

const Club = (/* props */) => {
  /* Note: 실제로 API를 통해 받아오는 데이터는 다를 수 있습니다. */
  /* Note: 데이터가 없는 경우 즉 참여하는 클럽이 없을 경우에 대한 예외처리가 필요합니다. */
  const data = [
    {
      id: "1",
      thumbnailImg: "https://cdn.pixabay.com/photo/2014/08/05/09/34/seoul-410257__340.jpg",
      title: "한강에서 같이 산책해요~",
      location: "뚝섬유원지",
    },
    {
      id: "2",
      thumbnailImg: "https://cdn.pixabay.com/photo/2017/08/15/22/51/golden-retriever-2645903__340.jpg",
      title: "리트리버 러닝",
      location: "반포공원",
    },
    {
      id: "3",
      thumbnailImg: "https://cdn.pixabay.com/photo/2016/06/12/04/01/bonjour-xiufeng-downtown-1451406__340.jpg",
      title: "애견 카페에서의 티타임",
      location: "도기스 카페",
    },
    {
      id: "4",
      thumbnailImg: "https://cdn.pixabay.com/photo/2016/02/05/19/52/man-1181873__340.jpg",
      title: "사랑하는 강아지와 등산",
      location: "광교산",
    },
    {
      id: "5",
      thumbnailImg: "",
      title: "시각장애인 안내견 모임",
      location: "제주시 복지센터",
    },
  ];
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
        {data.map((item) => (
          <SimpleClub key={item.id} data={item} />
        ))}
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
