import React from "react";

// Note: comment 정보를 props로 받음 (댓글, 소유자 정보)
const PostChatList = ({ comment, setIsModal, setUserId }) => {
  const imgMore = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;

  const handleModal = () => {
    setUserId(comment.author._id);
    setIsModal(true);
  };

  const detailDate = (createDate) => {
    const milliSeconds = new Date() - createDate;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  const nowDate = detailDate(new Date(comment.createdAt));

  return (
    <li className="mb-[1.2rem] last:mb-0">
      <img
        src="http://146.56.183.55:5050/Ellipse.png"
        alt=""
        className="inline-block w-[3.6rem] h-[3.6rem] object-cover rounded-full"
      />
      <p className="inline-block ml-[1.2rem]">
        <strong className="font-medium">{comment.author.accountname}</strong>
        <span className="relative align-middle text-cst-gray text-[1rem] ml-[1.4rem] before:content-[''] before:w-[0.2rem] before:h-[0.2rem] before:rounded-full before:absolute before:left-[-0.6rem] before:bottom-[0.6rem] before:bg-cst-gray">
          {nowDate}
        </span>
      </p>
      <button type="button" className="float-right mt-[0.6rem]" onClick={handleModal}>
        <img src={imgMore} alt="더보기" className="w-[2rem] h-[2rem]" />
      </button>
      <p className="ml-[4.8rem]">{comment.content}</p>
    </li>
  );
};

export default PostChatList;
