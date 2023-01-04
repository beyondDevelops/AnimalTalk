import { useEffect, useState } from "react";
import { HeaderFollow } from "../../shared/Header/HeaderFollow";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import Footer from "../../shared/Footer/Footer";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";

const Follow = () => {
  const [followerList, setFollowerList] = useState(null);
  const [followingList, setFollowingList] = useState(null);

  const location = useLocation();
  const pageAccount = location.pathname.split("/")[2];
  const pageName = location.pathname.split("/")[3];

  const token = localStorage.getItem("token");

  const getFollowerList = async () => {
    const res = await api.get(`/profile/${pageAccount}/follower?limit=${Infinity}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFollowerList(res.data);
  };

  const getFollowingList = async () => {
    const res = await api.get(`/profile/${pageAccount}/following?limit=${Infinity}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFollowingList(res.data);
  };

  useEffect(() => {
    if (pageName === "followers" && !followerList) {
      getFollowerList();
    } else if (pageName === "followings" && !followingList) {
      getFollowingList();
    }
  }, [pageName, followerList, followingList]);

  return (
    <div className="page">
      <HeaderFollow title={pageName} />
      <main>
        {pageName === "followers" && followerList && followerList.length > 0 ? (
          followerList.map((follower) => (
            <SimpleUserList
              key={follower._id}
              isBtn={true}
              isfollowMode={true}
              chat={null}
              isfollow={follower.isfollow}
              followAccount={follower.accountname}
              username={follower.username}
              profileSmallImg={follower.image}
              content={follower.intro}
            />
          ))
        ) : (
          <></>
        )}
        {pageName === "followings" && followingList && followingList.length > 0 ? (
          followingList.map((follower) => (
            <SimpleUserList
              key={follower._id}
              isBtn={true}
              isfollowMode={true}
              chat={null}
              isfollow={follower.isfollow}
              followAccount={follower.accountname}
              username={follower.username}
              profileSmallImg={follower.image}
              content={follower.intro}
            />
          ))
        ) : (
          <></>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Follow;
