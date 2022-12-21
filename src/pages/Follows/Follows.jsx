import React from "react";
import { HeaderSearch } from "../../shared/Header/HeaderSearch";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";

const Follow = () => {
  return (
    <div className="page">
      <HeaderSearch />
      <SimpleUserList isBtn={true} />
    </div>
  );
};

export default Follow;
