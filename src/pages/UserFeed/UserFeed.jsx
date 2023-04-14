import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { readClubList } from "../../api/Club/readClubList";
import { readProfile } from "../../api/Profile/readProfile";
import { readMyFeed } from "../../api/Feed/readMyFeed";
import Header from "../../shared/Header/Header";
import UserProfile from "../../shared/Profile/UserProfile";
import UserClub from "../../shared/UserClub/UserClub";
import PostTypeSelectBar from "../../components/PostTypeSelectBar/PostTypeSelectBar";
import NoFeed from "../../components/NoFeed/NoFeed";
import ErrorFeed from "../../components/ErrorFeed/ErrorFeed";
import Post from "../../shared/Post/Post";
import Footer from "../../shared/Footer/Footer";
import ModalInfo from "../../components/ModalModule/ModalInfo";
import Modal from "../../components/ModalModule/Modal";
import { useInfiniteQuery } from "react-query";
import { PostAlbumOutline } from "../../shared/Post/PostAlbumOutline";

const UserFeed = () => {
  const [isUpload, setIsUpload] = useState(true);
  const [pageProfile, setPageProfile] = useState(null);

  // 모달
  const [modal, setModal] = useState(false);
  const modalRef = useRef();
  // 로그아웃 모달
  const [logout, setLogout] = useState(false);
  const location = useLocation();
  const editAccountname = location.state?.editAccountname;
  const myAccountname = location.state?.myAccountname;
  const pageAccount = location.pathname.split("/")[2];

  // 게시글 리스트형, 앨범형 구분 토글
  const [list, setList] = useState(true);
  // 모임 정보
  const [club, setClub] = useState(null);

  // 피드 정보 무한스크롤 기능 구현
  const { data, status, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["userPost", pageAccount],
    ({ pageParam = 1 }) => readMyFeed(pageAccount, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    }
  );
  const observerTarget = useRef(null);
  const lastFeedRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      observerTarget.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (post) observerTarget.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleModalInfo = useCallback(
    (e) => {
      setModal(!modal);
      if (e.target === modalRef.current) {
        setModal(!modal);
      }
    },
    [modal]
  );

  const handleModalLogout = useCallback(() => {
    setLogout(!logout);
  }, [logout]);

  const handleCloseModal = useCallback(() => {
    setLogout(false);
  }, []);

  const onListToggle = () => {
    setList(!list);
  };

  useEffect(() => {
    if (editAccountname || myAccountname) {
      setIsUpload(true);
    }
  }, [editAccountname, myAccountname]);

  useEffect(() => {
    if (!isUpload) return;
    const getPageProfile = async () => {
      const data = await readProfile(pageAccount);
      setPageProfile(data);
    };
    const getPageClub = async () => {
      const data = await readClubList(pageAccount);
      setClub(data);
    };

    getPageProfile();
    getPageClub();
    setIsUpload(false);
  }, [isUpload, pageAccount]);

  if (status === "error") {
    return (
      <>
        <Header headerFor="feed" />
        <ErrorFeed errorMsg={error.message} />
        <Footer />
      </>
    );
  }

  const content = (
    <section>
      <h2 className="ir">유저 게시글</h2>
      {data?.pages?.length === 0 && <NoFeed />}
      {data?.pages?.length > 0 &&
        list &&
        data?.pages.map((page) => {
          return page?.map((post, idx) => {
            if (page.length === idx + 1) {
              return <Post key={uuidv4()} post={post} lastFeedRef={lastFeedRef} />;
            }
            return <Post key={uuidv4()} post={post} />;
          });
        })}
      {data?.pages.length > 0 && !list && <PostAlbumOutline results={data.pages} />}
    </section>
  );

  return (
    <>
      <Header headerFor="basic" onModalInfo={handleModalInfo} />
      <main>
        {pageProfile ? (
          <>
            <UserProfile pageProfile={pageProfile} setIsUpload={setIsUpload} editAccountname={editAccountname} />
            {club ? <UserClub club={club} {...{ setIsUpload }} /> : <></>}
            <PostTypeSelectBar list={list} onListToggle={onListToggle} />
            {content}
          </>
        ) : (
          <></>
        )}
      </main>
      <Footer />

      {/* 모달 */}
      {modal === true ? (
        <ModalInfo
          modalRef={modalRef}
          contentOne="설정 및 개인정보"
          contentTwo="로그아웃"
          onModalInfo={handleModalInfo}
          onModalAction={handleModalLogout}
        />
      ) : null}

      {/* 로그아웃 모달 */}
      {logout === true ? (
        <Modal modalRef={modalRef} content="로그아웃하시겠어요?" value="로그아웃" onModalClose={handleCloseModal} />
      ) : null}
    </>
  );
};
export default UserFeed;
