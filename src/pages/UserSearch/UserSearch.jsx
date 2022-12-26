import React, { useState, useEffect } from "react";
import { HeaderSearch } from "../../shared/Header/HeaderSearch";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import api from "../../api/axios";

const UserSearch = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (search) {
      const findUser = async () => {
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

      findUser();
    } else {
      setSearchResult([]);
    }
  }, [search, token]);

  return (
    <div className="page">
      <HeaderSearch search={search} setSearch={setSearch} />
      {searchResult.map((user) => (
        <SimpleUserList
          key={user._id}
          isMessage={false}
          isBtn={false}
          isChatMode={false}
          username={user.username}
          accountname={user.accountname}
          profileImg={user.image}
        />
      ))}
    </div>
  );
};

export default UserSearch;
