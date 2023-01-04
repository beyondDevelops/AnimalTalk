import React from "react";
import { useNavigate } from "react-router-dom";

const ChatDummyData = () => {
  const basicImg = `${process.env.PUBLIC_URL}/assets/img/profile-woman-small.png`;
  const basicImg2 = `${process.env.PUBLIC_URL}/assets/img/char-404-cat.svg`;
  const basicImg3 = `${process.env.PUBLIC_URL}/assets/img/char-default-cat.svg`;
  const basicImg4 = `${process.env.PUBLIC_URL}/assets/img/char-login-cat.svg`;
  const basicImg5 = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;

  const navigate = useNavigate();

  const userData = [
    {
      id: "0",
      username: "애니멀 걸",
      profileImage: basicImg,
      accountname: "animalgirl",
      text: "저녁 뭐 먹을까?",
      time: "2022.12.25",
    },
    {
      id: "1",
      username: "주황 고양이",
      profileImage: basicImg3,
      accountname: "orangecat",
      text: "취업 준비는 잘 되어가? 사료 떨어졌어 사와",
      time: "2022.12.23",
    },
    {
      id: "2",
      username: "애니멀 맨",
      profileImage: basicImg5,
      accountname: "animalman",
      text: "프로젝트 잘하고 있니?..",
      time: "2022.12.16",
    },
    {
      id: "3",
      username: "404 고양이",
      profileImage: basicImg2,
      accountname: "404cat",
      text: "올때 츄르 한 박스 사와",
      time: "2022.12.03",
    },
    {
      id: "4",
      username: "컬러풀 고양이",
      profileImage: basicImg4,
      accountname: "colorfulcat",
      text: "크리스마스에 영화보러 갈래?..",
      time: "2022.12.02",
    },
  ];

  const handleChatRoom = (e) => {
    navigate(`/chat/${e.currentTarget.dataset.value}`);
  };

  return (
    <>
      {userData.map((item) => (
        <li
          data-value={item.accountname}
          onClick={handleChatRoom}
          key={item.id}
          className="relative mx-[1.6rem] my-[1.6rem] flex justify-between items-center cursor-pointer"
        >
          <img src={item.profileImage} alt="" className="w-[5rem] h-[5rem] rounded-[50%]" />
          <p className="mr-auto ml-[1.2rem]">
            <strong className="font-medium">{item.username}</strong>
            <span className="block text-[1.2rem] w-[23.8rem] whitespace-nowrap text-cst-gray text-ellipsis overflow-hidden">
              {item.text}
            </span>
          </p>
          <time dateTime="2022-12-21" className="mt-[2.3rem] text-[1rem] text-cst-light-gray">
            {item.time}
          </time>
        </li>
      ))}
    </>
  );
};

export default ChatDummyData;
