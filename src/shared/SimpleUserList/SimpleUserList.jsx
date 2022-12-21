import React, { useState } from "react";

const SimpleUserList = ({ isBtn }) => {
  // Note::아래 변수는 임시로 구현했으며, 실제로는 API와 props를 사용합니다.
  const tmpImg = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  // const isBtn = true;
  const userName = "사용자 이름";
  // Note::아래 셋 중 하나가 사용됩니다. nullish를 사용해서 0이 아닌 null 값이 들어가야 됩니다.
  // Note:: props로 데이터를 전달받아서 사용하면 편할 거 같습니다.
  const accountName = null;
  const content = null;
  const chat = "마지막 대화 내역입니다. 가나다라마바사아자카타파하";

  // 채팅리스트에서만 사용됩니다. 읽지 않은 메시지 알람을 관립합니다.
  const message = true;

  // Note::useState(false)안의 인자값을 props로 받고 이벤트 발생 시 axios로 데이터를 전송하는 건 어떨까요?
  const [isFollow, setIsFollow] = useState(false);

  const handleIsFollow = () => {
    setIsFollow(!isFollow);
    // Note::form 대신 이 부분에서 axios를 통해서 데이터를 보내면 될 거 같습니다.
  };

  // Note::호출하는 부모태그(ul)에 mt-[20px]이 들어가야 합니다.
  return (
    <li
      className={`relative mx-[1.6rem] my-[1.6rem] flex justify-between items-center ${
        message
          ? "before:content-[''] before:bg-m-color before:w-[1.2rem] before:h-[1.2rem] before:absolute before:left-0 before:top-0 before:rounded-full"
          : ""
      } `}
    >
      <img src={tmpImg} alt="" className="w-[5rem] h-[5rem]" />
      <p className="mr-auto ml-[1.2rem]">
        <strong className="font-medium">{userName}</strong>
        <span className="block text-[1.2rem] w-[23.8rem] whitespace-nowrap text-cst-gray text-ellipsis overflow-hidden">
          {accountName ?? content ?? chat}
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
        <>
          <time dateTime="2022-12-21" className="mt-[2.3rem] text-[1rem] text-cst-light-gray">
            2022.12.21
          </time>
        </>
      )}
    </li>
  );
};

export default SimpleUserList;
