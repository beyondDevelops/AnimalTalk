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
    <section className="pt-[30px] px-[55px] pb-[26px]">
      <h2 className="ir">유저 프로필</h2>

      {/* 팔로우 리스트 링크, 유저 사진 */}
      <Link to="/" className="inline-block">
        <button type="button" className="text-[10px] text-[#767676]">
          <span className="block mb-[px] text-[18px] text-black font-bold">{followers}</span>
          followers
        </button>
      </Link>
      <img src={tmpImg} alt="" className="inline-block w-[110px] h-[110px] ml-[43px] mr-[36px]" />
      <Link to="/" className="inline-block">
        <button type="button" className="text-[10px] text-[#767676]">
          <span className="block text-[18px] font-bold text-black">{followings}</span>
          followings
        </button>
      </Link>

      {/* 유저 정보 텍스트 */}
      <p className="w-fit mx-auto mt-[16px] text-[16px] font-bold">애월읍 위니브 감귤농장</p>
      <p className="w-fit mx-auto text-[12px] text-[#767676]">@ weniv_Mandarin</p>
      <p className="w-fit mx-auto mt-[16px] mb-[24px] text-[#767676]">애월읍 감귤 전국 배송, 귤따기 체험, 감귤농장</p>

      {/* 채팅, 팔로우, 공유 */}
      <Link
        to="/chat"
        className="inline-flex justify-center items-center w-[34px] h-[34px] border-[1px] border-[#DBDBDB] rounded-[30px] ml-[36px] align-bottom"
      >
        <img src={chatImg} alt="" className="w-[20px] h-[20px]" />
      </Link>
      <button
        type="button"
        onClick={handleIsFollow}
        className={`h-[34px] mx-[10px] btn-lg ${isFollow ? "btn-on text-white" : "btn-cancle text-[#767676]"}`}
      >
        {isFollow ? "팔로우" : "언팔로우"}
      </button>
      <button
        type="button"
        to="/"
        className="inline-flex justify-center items-center w-[34px] h-[34px] border-[1px] border-[#DBDBDB] rounded-[30px] align-bottom"
      >
        <img src={shareImg} alt="" className="w-[20px] h-[20px]" />
      </button>
    </section>
  );
};

export default UserProfile;
