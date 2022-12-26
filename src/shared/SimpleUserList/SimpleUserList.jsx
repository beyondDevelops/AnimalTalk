import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SimpleUserList = ({ isMessage, isBtn, isChatMode, username, accountname, profileSmallImg }) => {
  // Note::아래 변수는 임시로 구현했으며, 실제로는 API와 props를 사용합니다.
  // const profileImg = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;

  // Note::아래 셋 중 하나가 사용됩니다. nullish를 사용해서 0이 아닌 null 값이 들어가야 됩니다.
  // Note:: 실제로는 nullish가 아니라 props를 사용해 컨트롤할 수 있습니다.
  const content = null;
  const chat = isChatMode && "안녕하세요. 가나다라마바사아자카타파하아";

  // 채팅리스트에서만 사용됩니다. 읽지 않은 메시지 알람을 관립합니다.
  // const message = true;
  const navigate = useNavigate();

  // Note::useState(false)안의 인자값을 props로 받고 이벤트 발생 시 axios로 데이터를 전송하는 건 어떨까요?
  const [isFollow, setIsFollow] = useState(false);

  const handleIsFollow = () => {
    setIsFollow(!isFollow);
    // Note::form 대신 이 부분에서 axios를 통해서 데이터를 보내면 될 거 같습니다.
  };

  const handleLink = () => {
    if (chat) {
      navigate("/chat/1");
    } else {
      navigate(`/profile/${accountname}`);
    }
  };

  // Note::호출하는 부모태그(ul)에 mt-[20px]이 들어가야 합니다.
  return (
    <li
      className={`relative mx-[1.6rem] my-[1.6rem] flex justify-between items-center ${
        isMessage
          ? "before:content-[''] before:bg-m-color before:w-[1.2rem] before:h-[1.2rem] before:absolute before:left-0 before:top-0 before:rounded-full"
          : ""
      } `}
    >
      <img src={profileSmallImg} alt="" className="w-[5rem] h-[5rem] cursor-pointer" onClick={handleLink} />
      <p className="mr-auto ml-[1.2rem] cursor-pointer" onClick={handleLink}>
        <strong className="font-medium">{username}</strong>
        <span className="block text-[1.2rem] w-[23.8rem] whitespace-nowrap text-cst-gray text-ellipsis overflow-hidden">
          {`@ ${accountname}` ?? content ?? chat}
        </span>
      </p>
      {isBtn ? (
        <button
          onClick={handleIsFollow}
          type="button"
          className={`btn-sm ${isFollow ? "btn-on text-white" : "btn-cancle text-cst-gray"}`}
        >
          {isFollow ? "팔로우" : "취소"}
        </button>
      ) : (
        <></>
      )}
      {isChatMode ? (
        <time dateTime="2022-12-21" className="mt-[2.3rem] text-[1rem] text-cst-light-gray">
          2022.12.21
        </time>
      ) : (
        <></>
      )}
    </li>
  );
};

export default SimpleUserList;
