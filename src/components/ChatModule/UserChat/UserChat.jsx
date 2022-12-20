import React, { useEffect, useState } from "react";

const UserChat = (props) => {
  const tmpProfile = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const tmpImg = "https://cdn.pixabay.com/photo/2014/10/01/10/44/animal-468228__480.jpg";
  const isImg = false;
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(props.user);
  }, []);

  return userInfo === "your" ? (
    <section className="flex ml-[1.6rem] mb-[1rem] mr-[4.7rem]">
      <h2 className="ir">{userInfo} 채팅</h2>
      <img src={tmpProfile} alt="" className="w-[4.2rem] h-[4.2rem] mr-[1.2rem] object-cover" />
      {isImg ? (
        <img src={tmpImg} alt="" className="w-[22rem] h-[22rem] object-cover rounded-[10px]" />
      ) : (
        <p className="p-[1.2rem] rounded-tr-[1rem] rounded-b-[1rem] border-[1px] border-[#C4C4C4] bg-white">
          옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
          약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
        </p>
      )}
      <time dateTime="2022-12-19 12:40" className="self-end ml-[0.6rem] text-[1rem] text-[#767676]">
        12:40
      </time>
    </section>
  ) : (
    <section className="flex flex-row-reverse ml-[4.7rem] mb-[1rem] mr-[1.6rem]">
      <h2 className="ir">{userInfo} 채팅</h2>
      {isImg ? (
        <img src={tmpImg} alt="" className="w-[22rem] h-[22rem] object-cover rounded-[10px]" />
      ) : (
        <p className="p-[1.2rem] rounded-tl-[1rem] rounded-b-[1rem] bg-m-color text-white">
          옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
          약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
        </p>
      )}
      <time dateTime="2022-12-19 12:40" className="self-end mr-[0.6rem] text-[1rem] text-[#767676]">
        12:40
      </time>
    </section>
  );
};

export default UserChat;
