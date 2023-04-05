import React, { useState, useEffect, useMemo, useTransition, useDeferredValue } from "react";
import Header from "../../shared/Header/Header";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import { api, getSearchUser } from "../../api/axios";

const UserSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const findUser = async (search) => {
    try {
      const data = await getSearchUser(search);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      console.log(deferredSearch);
      if (!deferredSearch) {
        setSearchResult([]);
      } else {
        const users = await findUser(deferredSearch);
        const filterUsers = users.filter(
          (user) =>
            user.username.toLowerCase().includes(deferredSearch) ||
            user.accountname.toLowerCase().includes(deferredSearch)
        );
        setSearchResult(filterUsers);
      }
    });
  }, [deferredSearch]);

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

  // const token = localStorage.getItem("token");
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  // const findUser = async (search) => {
  //   try {
  //     const res = await api.get(`/user/searchuser/?keyword=${search}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const filterUsers = res.data.filter(
  //       (user) =>
  //         user.username.toLowerCase().includes(search.toLowerCase()) ||
  //         user.accountname.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setSearchResult(filterUsers);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     if (search) {
  //       findUser(search);
  //     } else {
  //       setSearchResult([]);
  //     }
  //   }, 300);
  //   return () => clearTimeout(debounce);
  // }, [search]);

  return (
    <>
      <Header headerFor="search" search={search} onSearch={onSearch} />
      <main>{content}</main>
    </>
  );
};

export default UserSearch;
