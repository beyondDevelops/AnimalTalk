import { useQuery } from "react-query";
import Header from "../../shared/Header/Header";
import { useState, useEffect, useMemo } from "react";
import { readSearch } from "../../api/Search/readSearch";
import Loading from "../../components/Loading/Loading";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";

const UserSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data, isLoading } = useQuery("search", () => readSearch(search), {
    enabled: search.length > 0,
  });

  const findUser = async (search) => {
    const filterUsers = data?.filter(
      (user) => user.username.toLowerCase().includes(search) || user.accountname.toLowerCase().includes(search)
    );
    setSearchResult(filterUsers);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        findUser(search);
      } else {
        setSearchResult([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const content = useMemo(
    () => (
      <ul>
        {searchResult?.map((user) => (
          <SimpleUserList
            key={user._id}
            isMessage={false}
            isBtn={false}
            isChatMode={false}
            isfollowMode={false}
            isSearchMode={true}
            chat={null}
            userAccount={user.accountname}
            username={user.username}
            profileSmallImg={
              user.image &&
              user.image !== "http://146.56.183.55:5050/Ellipse.png" &&
              user.image !== "https://mandarin.api.weniv.co.kr/Ellipse.png"
                ? user.image
                : `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`
            }
          />
        ))}
      </ul>
    ),
    [searchResult]
  );

  return (
    <>
      <Header headerFor="search" search={search} setSearch={setSearch} />
      {isLoading && <Loading />}
      {!isLoading && <main>{content}</main>}
    </>
  );
};

export default UserSearch;
