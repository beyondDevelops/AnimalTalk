import { Link } from "react-router-dom";

export const HeaderFeed = () => {
  const search = `${process.env.PUBLIC_URL}/assets/img/icon-search.png`;
  return (
    <header className="flex justify-between items-center px-[1.6rem]">
      <span className="text-[1.8rem] font-medium">애니멀톡 피드</span>
      {/* button을 Link로 바꾸어 serach페이지로 이동해야합니다. */}
      <Link to="/search" className="w-[2.4rem] h-[2.4rem] my-[1.2rem]">
        <img src={search} alt="검색하기" />
      </Link>
    </header>
  );
};
