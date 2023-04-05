import React, { useState, useEffect, useMemo } from "react";
import Header from "../../shared/Header/Header";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import { getSearchUser } from "../../api/axios";

const UserSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const findUser = async (search) => {
    try {
      const users = await getSearchUser(search);
      const filterUsers = users.filter(
        (user) => user.username.toLowerCase().includes(search) || user.accountname.toLowerCase().includes(search)
      );
      setSearchResult(filterUsers);
    } catch (err) {
      console.log(err);
    }
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
        {searchResult.map((user) => (
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
      <main>{content}</main>
    </>
  );
};

export default UserSearch;
