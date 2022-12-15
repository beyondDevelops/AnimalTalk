import React from "react";
import Footer from "../../share/Footer";
import { HeaderSave, HeaderChat } from "../../share/HeaderBind";
import SimpleUserList from "../../share/SimpleUserList";

const Chat = () => {
  const ts = true;
  return (
    <div className="bg-gray-100">
      <div className="page">
        {/* <header className="h-[48px] bg-green-300">헤더가 들어갑니다.</header> */}
        <HeaderSave />
        <main className="bg-cyan-300 basis-full overflow-hidden overflow-y-auto scrollbar-hide">
          <ul className="mt-[20px]">
            <SimpleUserList />
            <SimpleUserList />
            <SimpleUserList />
            <SimpleUserList />
          </ul>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className={`btn-xl ${ts ? "bg-[#EDA751]" : "bg-[#FCD690]"}`}>Chat 나와라</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className={`btn-xl ${ts ? "bg-[#EDA751]" : "bg-[#FCD690]"}`}>Chat 나와라</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className={`btn-xl ${ts ? "bg-[#EDA751]" : "bg-[#FCD690]"}`}>Chat 나와라</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className={`btn-xl ${ts ? "bg-[#EDA751]" : "bg-[#FCD690]"}`}>Chat 나와라</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className={`btn-xl ${ts ? "bg-[#EDA751]" : "bg-[#FCD690]"}`}>Chat 나와라</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
          <button className="btn-lg bg-[#EDA751]">팔로우</button>
          <button className="btn-md bg-[#EDA751]">저장</button>
          <button className="btn-sm bg-[#EDA751]">팔로우</button>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Chat;
