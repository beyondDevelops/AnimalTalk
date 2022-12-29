import { useNavigate } from "react-router-dom";

const SimpleClub = ({ data }) => {
  const navigate = useNavigate();
  const clubId = data.id;
  const clubThumbnailImg = data.itemImage
    ? data.itemImage
    : "https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
  const clubTitle = data.itemName;
  const clubFee = data.price;

  return (
    <li className="shrink-0 basis-[14rem] mr-[1rem] overflow-hidden">
      <div className="cursor-pointer" onClick={() => navigate(`/product/detail/${clubId}`)}>
        <img
          className="w-[14rem] h-[9rem] object-cover border-[0.05rem] border-cst-light-gray rounded-[8px]"
          src={
            clubThumbnailImg.includes("https")
              ? clubThumbnailImg
              : `https://mandarin.api.weniv.co.kr/${clubThumbnailImg}`
          }
          alt=""
        />
        <strong className="block mt-[0.6rem] mx-[0.2rem] leading-[1.8rem] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
          {clubTitle}
        </strong>
        <span className="block mt-[0.4rem] mx-[0.2rem] text-[1.2rem] leading-[1.5rem] font-bold text-m-color">
          {clubFee}
        </span>
      </div>
    </li>
  );
};

export default SimpleClub;
