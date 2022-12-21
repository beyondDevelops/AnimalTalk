import React from "react";
import { HeaderSearch } from "../../shared/Header/HeaderSearch";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";

const Search = () => {
  return (
    <div className="page">
      <HeaderSearch />
      <SimpleUserList isBtn={false} />
    </div>
  );
};

export default Search;
