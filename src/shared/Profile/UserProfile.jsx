import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  // Note:: 아래 변수들은 API에서 받은 데이터로 바뀌어야 합니다.
  const tmpImg = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;
  const chatImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;
  const shareImg = `${process.env.PUBLIC_URL}/assets/img/icon-share.png`;
  const followers = 2350;
  const followings = 128;
  // Note: useState(false)안의 인자값을 props로 받고 이벤트 발생 시 axios로 데이터를 전송하는 건 어떨까요?
  const [isFollow, setIsFollow] = useState(false);

  const handleIsFollow = () => {
    setIsFollow(!isFollow);
    // Note:: 여기서 axios로 팔로우 데이터를 전송하면 될 거 같습니다.
  };

  return (
    <section className="pt-[3rem] px-[5.5rem] pb-[2.6rem]">
      <h2 className="ir">유저 프로필</h2>

      {/* 팔로우 리스트 링크, 유저 사진 */}
      <Link to="/profile/:accountname/followers" className="inline-block">
        <button type="button" className="text-[1rem] text-cst-gray">
          <span className="block text-[1.8rem] font-bold text-black">{followers}</span>
          followers
        </button>
      </Link>
      <img src={tmpImg} alt="" className="inline-block w-[11rem] h-[11rem] ml-[4.3rem] mr-[3.6rem]" />
      <Link to="/profile/:accountname/followings" className="inline-block">
        <button type="button" className="text-[1rem] text-cst-gray">
          <span className="block text-[1.8rem] font-bold text-black">{followings}</span>
          followings
        </button>
      </Link>

      {/* 유저 정보 텍스트 */}
      <p className="w-fit mx-auto mt-[1.6rem] text-[1.6rem] font-bold">애월읍 위니브 감귤농장</p>
      <p className="w-fit mx-auto text-[1.2rem] text-cst-gray">@ weniv_Mandarin</p>
      <p className="w-fit mx-auto mt-[1.6rem] mb-[2.4rem] text-cst-gray">
        애월읍 감귤 전국 배송, 귤따기 체험, 감귤농장
      </p>

      {/* 채팅, 팔로우, 공유 */}
      <Link
        to="/chat"
        className="inline-flex justify-center items-center w-[3.4rem] h-[3.4rem] border-[0.1rem] border-cst-light-gray rounded-[30px] ml-[3.6rem] align-bottom"
      >
        <img src={chatImg} alt="" className="w-[2rem] h-[2rem]" />
      </Link>
      <button
        type="button"
        onClick={handleIsFollow}
        className={`h-[3.4rem] mx-[1rem] btn-lg ${isFollow ? "btn-on text-white" : "btn-cancle text-cst-gray"}`}
      >
        {isFollow ? "팔로우" : "언팔로우"}
      </button>
      <button
        type="button"
        to="/"
        className="inline-flex justify-center items-center w-[3.4rem] h-[3.4rem] border-[0.1rem] border-cst-light-gray rounded-[30px] align-bottom"
      >
        <img src={shareImg} alt="" className="w-[2rem] h-[2rem]" />
      </button>
    </section>
  );
};

export default UserProfile;
