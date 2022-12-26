import React, { useEffect, useState } from "react";
import { HeaderSearch } from "../../shared/Header/HeaderSearch";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import api from "../../api/axios";

const Search = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (search) {
      const findUser = async () => {
        try {
          const res = await api.get(`/user/searchuser/?keyword=${search}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserList(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      findUser();
    } else {
      setUserList([]);
    }
  }, [search, token]);

  useEffect(() => {
    if (search) {
      const filterUsers = userList.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.accountname.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filterUsers.reverse());
    }
  }, [userList, search]);

  return (
    <div className="page">
      <HeaderSearch search={search} setSearch={setSearch} />
      {userList.map((user) => (
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

export default Search;
