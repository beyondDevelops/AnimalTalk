import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { UserContext } from "../../context/UserContext";

const SimpleUserList = ({
  isMessage,
  isBtn,
  isChatMode,
  isfollowMode,
  chat,
  isfollow,
  userAccount,
  username,
  followAccount,
  profileSmallImg,
  content,
}) => {
  const defaultProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;

  // 채팅리스트에서만 사용됩니다. 읽지 않은 메시지 알람을 관립합니다.
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { accountname } = useContext(UserContext);

  const [isFollow, setIsFollow] = useState(isfollow);

  const handleLink = () => {
    if (chat) {
      navigate("/chat/1");
    } else {
      navigate(`/profile/${followAccount}`);
    }
  };

  // followReq, unfollowReq 함수는 중복으로 사용되고 있습니다. api에서 관리할 필요가 있습니다.
  const followReq = async () => {
    // 로그인한 사용자의 토큰으로 상대방 계정이 포함된 api url 통신을 하여야 함
    const res = await api.post(
      `/profile/${followAccount}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsFollow(res.data.profile.isfollow);
  };

  const unfollowReq = async () => {
    const res = await api.delete(`/profile/${followAccount}/unfollow`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsFollow(res.data.profile.isfollow);
  };

  return (
    <li
      className={`relative mx-[1.6rem] my-[1.6rem] flex justify-between items-center ${
        isMessage
          ? "before:content-[''] before:bg-m-color before:w-[1.2rem] before:h-[1.2rem] before:absolute before:left-0 before:top-0 before:rounded-full"
          : ""
      } `}
    >
      <img
        src={profileSmallImg}
        alt=""
        className="w-[5rem] h-[5rem] cursor-pointer rounded-[50%]"
        onClick={handleLink}
        onError={(e) => {
          e.target.src = defaultProfile;
        }}
      />
      <p className="mr-auto ml-[1.2rem] cursor-pointer" onClick={handleLink}>
        <strong className="font-medium">{username}</strong>
        {!isfollowMode && userAccount && (
          <span className="block text-[1.2rem] w-[23.8rem] whitespace-nowrap text-cst-gray text-ellipsis overflow-hidden">
            {`@ ${userAccount}`}
          </span>
        )}
        {isfollowMode && content && (
          <span className="block text-[1.2rem] w-[23.8rem] whitespace-nowrap text-cst-gray text-ellipsis overflow-hidden">
            {content}
          </span>
        )}
        {chat && (
          <span className="block text-[1.2rem] w-[23.8rem] whitespace-nowrap text-cst-gray text-ellipsis overflow-hidden">
            {chat}
          </span>
        )}
      </p>

      {followAccount !== accountname && isBtn ? (
        <button
          onClick={() => {
            isFollow ? unfollowReq() : followReq();
          }}
          type="button"
          className={`btn-sm ${isFollow ? "btn-cancel text-cst-gray" : "btn-on text-white"}`}
        >
          {isFollow ? "취소" : "팔로우"}
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
