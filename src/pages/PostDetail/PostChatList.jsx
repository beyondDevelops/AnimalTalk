import React from "react";

const PostChatList = () => {
  const imgMore = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;

  return (
    <li className="mb-[1.2rem] last:mb-0">
      <img
        src="http://146.56.183.55:5050/Ellipse.png"
        alt=""
        className="inline-block w-[3.6rem] h-[3.6rem] object-cover rounded-full"
      />
      <p className="inline-block ml-[1.2rem]">
        <strong className="font-medium">서귀포 무슨 농장</strong>
        <span className="relative align-middle text-cst-gray text-[1rem] ml-[1.4rem] before:content-[''] before:w-[0.2rem] before:h-[0.2rem] before:rounded-full before:absolute before:left-[-0.6rem] before:bottom-[0.6rem] before:bg-cst-gray">
          5분 전
        </span>
      </p>
      <button className="float-right mt-[0.6rem]">
        <img src={imgMore} alt="더보기" className="w-[2rem] h-[2rem]" />
      </button>
      <p className="ml-[4.8rem]">
        안녕하세요. 사진이 너무 멋있어요. 한라봉 언제 먹을 수 있나요? 기다리기 지쳤어요 땡뻘땡뻘...
      </p>
    </li>
  );
};

export default PostChatList;
