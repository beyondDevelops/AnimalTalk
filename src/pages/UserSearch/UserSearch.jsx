import React, { useState, useEffect } from "react";
import { HeaderSearch } from "../../shared/Header/HeaderSearch";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import api from "../../api/axios";

const UserSearch = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const findUser = async (search) => {
    try {
      const res = await api.get(`/user/searchuser/?keyword=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filterUsers = res.data.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.accountname.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filterUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (search) {
      setTimeout(() => {
        findUser(search);
      }, 500);
    } else {
      setSearchResult([]);
    }
  }, [search, token]);

  return (
    <div className="page">
      <HeaderSearch search={search} setSearch={setSearch} />
      <main>
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
      </main>
    </div>
  );
};

export default UserSearch;
