import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";
import { HeaderBasic } from "../../shared/Header/HeaderBasic";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";

const Chat = () => {
  return (
    <div className="page">
      <HeaderBasic />
      <main>
        <ul className="mt-[2rem]">
          {/* Route URL 확인을 위해 임시로 Link 요소를 적용하였습니다. */}
          {/* 실제로는 SimpleUserList 컴포넌트에서 props로 받은 데이터를 통해 onClick 이벤트로 navigate를 사용해야 합니다. */}
          <Link to="/chat/1">
            <SimpleUserList isBtn={false} className="cursor-pointer" />
          </Link>
          <Link to="/chat/2">
            <SimpleUserList isBtn={false} className="cursor-pointer" />
          </Link>
          <Link to="/chat/3">
            <SimpleUserList isBtn={false} className="cursor-pointer" />
          </Link>
          <Link to="/chat/4">
            <SimpleUserList isBtn={false} className="cursor-pointer" />
          </Link>
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
