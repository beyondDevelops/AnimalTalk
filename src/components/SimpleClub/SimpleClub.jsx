import { useNavigate } from "react-router-dom";

const SimpleClub = ({ data }) => {
  // Note: 아래 주석처리된 변수는 추가 기능에 사용됩니다.
  // const navigate = useNavigate();
  // const clubId = data.id;
  const clubThumbnailImg = data.itemImage;
  const clubTitle = data.itemName;

  const comma = (money) => {
    return money
      .toString()
      .split("")
      .reverse("")
      .map((val, idx) => (idx % 3 === 0 && idx !== 0 ? val + "," : val))
      .reverse()
      .join("");
  };

  const clubFee = comma(data.price);

  return (
    <li className="shrink-0 basis-[14rem] mr-[1rem] overflow-hidden">
      <img
        className="w-[14rem] h-[9rem] object-cover border-[0.05rem] border-cst-light-gray rounded-[8px]"
        src={
          clubThumbnailImg.includes("https") ? clubThumbnailImg : `https://mandarin.api.weniv.co.kr/${clubThumbnailImg}`
        }
        alt=""
      />

      <p>
        {/* Note: 추가 기능 <p className="cursor-pointer" onClick={() => navigate(`/product/detail/${clubId}`)}> */}
        <strong className="block mt-[0.6rem] mx-[0.2rem] leading-[1.8rem] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
          {clubTitle}
        </strong>
        <span className="block mt-[0.4rem] mx-[0.2rem] text-[1.2rem] leading-[1.5rem] font-bold text-m-color">
          {clubFee}원
        </span>
      </p>
    </li>
  );
};

export default SimpleClub;
