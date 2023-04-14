import { useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../shared/Header/Header";
import SimpleUserList from "../../shared/SimpleUserList/SimpleUserList";
import Footer from "../../shared/Footer/Footer";
import { readFollowerList } from "../../api/Profile/follow/readFollowerList";
import { readFollowingList } from "../../api/Profile/follow/readFollowingList";
import { useInfiniteQuery } from "react-query";

const Follow = () => {
  const location = useLocation();
  const pageAccount = location.pathname.split("/")[2];
  const pageName = location.pathname.split("/")[3];

  const {
    data: userList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    pageName === "followers" ? ["followerList", pageAccount] : ["followingList", pageAccount],
    ({ pageParam = 1 }) => {
      if (pageName === "followers") {
        return readFollowerList(pageAccount, pageParam);
      } else {
        return readFollowingList(pageAccount, pageParam);
      }
    },
    {
      enabled: pageName === "followers" || pageName === "followings",
      getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    }
  );
  // console.log(userList);

  const observerTarget = useRef(null);
  const lastUserRef = useCallback(
    (user) => {
      if (isFetchingNextPage) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      observerTarget.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (user) observerTarget.current.observe(user);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const followerContent = userList?.pages.map((page) => {
    return page?.map((user, idx) => {
      if (page.length === idx + 1) {
        return (
          <SimpleUserList
            key={user._id}
            isfollow={user.isfollow}
            followAccount={user.accountname}
            username={user.username}
            profileSmallImg={user.image}
            content={user.intro}
            isBtn={true}
            isfollowMode={true}
            chat={null}
            ref={lastUserRef}
          />
        );
      }
      return (
        <SimpleUserList
          key={user._id}
          isfollow={user.isfollow}
          followAccount={user.accountname}
          username={user.username}
          profileSmallImg={user.image}
          content={user.intro}
          isBtn={true}
          isfollowMode={true}
          chat={null}
        />
      );
    });
  });

  const followingContent = userList?.pages.map((page) => {
    return page?.map((user, idx) => {
      if (page.length === idx + 1) {
        return (
          <SimpleUserList
            key={user._id}
            isfollow={user.isfollow}
            followAccount={user.accountname}
            username={user.username}
            profileSmallImg={user.image}
            content={user.intro}
            isBtn={true}
            isfollowMode={true}
            chat={null}
            ref={lastUserRef}
          />
        );
      }
      return (
        <SimpleUserList
          key={user._id}
          isfollow={user.isfollow}
          followAccount={user.accountname}
          username={user.username}
          profileSmallImg={user.image}
          content={user.intro}
          isBtn={true}
          isfollowMode={true}
          chat={null}
        />
      );
    });
  });

  return (
    <>
      <Header headerFor="follow" title={pageName} />
      <main>
        {pageName === "followers" && followerContent ? followerContent : <></>}
        {pageName === "followings" && followingContent ? followingContent : <></>}
      </main>
      <Footer />
    </>
  );
};

export default Follow;
