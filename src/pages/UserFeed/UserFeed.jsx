import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getPageOwnerClub, getPageOwnerProfile } from "../../api/axios";
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
import useFeeds from "../../hooks/useFeeds";
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
  const [feedNum, setFeedNum] = useState(0);
  const { results, isLoading, isError, error, hasMore } = useFeeds(feedNum);
  const observerTarget = useRef(null);

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
    const token = localStorage.getItem("token");
    const getPageProfile = async () => {
      try {
        const data = await getPageOwnerProfile(pageAccount, token);
        setPageProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    const getPageClub = async () => {
      try {
        const data = await getPageOwnerClub(pageAccount, token);
        setClub(data);
      } catch (err) {
        console.log(err);
      }
    };

    getPageProfile();
    getPageClub();
    setIsUpload(false);
  }, [isUpload, pageAccount]);

  const lastFeedRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      observerTarget.current = new IntersectionObserver((feeds) => {
        if (feeds[0].isIntersecting && hasMore) {
          setFeedNum((prev) => prev + 1);
        }
      });
      if (post) observerTarget.current.observe(post);
    },
    [isLoading, hasMore]
  );

  if (isError) {
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
      {results.length === 0 && <NoFeed />}
      {results.length > 0 &&
        list &&
        results.map((post, idx) => {
          if (results.length === idx + 1) {
            return <Post key={post.id + uuidv4()} {...{ post }} {...{ setIsUpload }} ref={lastFeedRef} />;
          } else {
            return <Post key={post.id + uuidv4()} {...{ post }} {...{ setIsUpload }} />;
          }
        })}
      {results.length > 0 && !list && <PostAlbumOutline results={results} />}
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
