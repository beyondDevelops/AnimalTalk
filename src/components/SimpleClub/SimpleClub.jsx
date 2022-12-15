import { Link, useParams } from "react-router-dom";

const SimpleClub = (props) => {
  const { club } = useParams();

  const clubThumbnailImg = props.data.thumbnailImg
    ? props.data.thumbnailImg
    : "https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
  const clubTitle = props.data.title;
  const clubLocation = props.data.location;

  return (
    <li className="shrink-0 basis-[140px] mr-[10px] overflow-hidden">
      <Link to={`/:${club}`}>
        <img
          className="w-[140px] h-[90px] object-cover border-[0.5px] border-[#dbdbdb] rounded-[8px]"
          src={clubThumbnailImg}
          alt=""
        />
        <strong className="block mt-[6px] mx-[2px] text-[14px] leading-[18px] font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
          {clubTitle}
        </strong>
        <span className="block mt-[4px] mx-[2px] text-[12px] leading-[15px] font-bold text-[#EDA751]">
          {clubLocation}
        </span>
      </Link>
    </li>
  );
};

export default SimpleClub;
