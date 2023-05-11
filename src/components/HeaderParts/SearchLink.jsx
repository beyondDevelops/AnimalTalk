import { Link } from "react-router-dom";

export const SearchLink = () => {
  const searchImg = `${process.env.PUBLIC_URL}/assets/img/icon-search.png`;

  return (
    <Link to="/search" className="w-[2.4rem] h-[2.4rem] my-[1.2rem]">
      <img src={searchImg} alt="검색하기" />
    </Link>
  );
};
