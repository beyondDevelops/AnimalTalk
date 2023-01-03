import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import { HeaderBasic } from "../../shared/Header/HeaderBasic";
import UserProfile from "../../shared/Profile/UserProfile";
import UserClub from "../../shared/UserClub/UserClub";
import PostTypeSelectBar from "../../components/PostTypeSelectBar/PostTypeSelectBar";
import Post from "../../shared/Post/Post";
import PostAlbum from "../../shared/Post/PostAlbum";
import Footer from "../../shared/Footer/Footer";
import ModalInfo from "../../components/ModalModule/ModalInfo";
import Modal from "../../components/ModalModule/Modal";
import useIntersect from "../../hooks/useIntersect";

const UserFeed = () => {
  const defaultCatImg = `${process.env.PUBLIC_URL}/assets/img/char-default-cat.svg`;

  const token = localStorage.getItem("token");

  const [pageProfile, setPageProfile] = useState(null);
  const [list, setList] = useState(true);
  const [postDataArray, setPostDataArray] = useState([]);
  const [club, setClub] = useState(null);
  const [state, setState] = useState({ postNum: 0, moreFeed: true });
  const [isUpload, setIsUpload] = useState(true);

  const [modal, setModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const modalRef = useRef();

  const location = useLocation();
  const pageAccount = location.pathname.split("/")[2];

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
    if (!isUpload) return;
    const getPageProfile = async () => {
      try {
        const res = await api.get(`/profile/${pageAccount}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPageProfile(res.data.profile);
        setIsUpload(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPageProfile();
    setIsUpload(false);
  }, [pageAccount, token, pageProfile, isUpload]);

  // 게시글 삭제 시 재렌더링
  useEffect(() => {
    if (!isUpload) return;
    const getUserFeeds = async () => {
      try {
        const res = await api.get(`/post/${pageAccount}/userpost`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostDataArray(res.data.post);
      } catch (err) {
        console.log(err);
      }
    };
    getUserFeeds();

    setIsUpload(false);
  }, [pageAccount, isUpload, token, postDataArray]);

  const getUserFeeds = async () => {
    try {
      const res = await api.get(`/post/${pageAccount}/userpost/?limit=10&skip=${state.postNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostDataArray((prev) => [...prev, ...res.data.post]);
      setState((prev) => ({
        postNum: prev.postNum + 10,
        moreFeed: postDataArray.length % 10 === 0,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   // if (postDataArray.length === 0) {
  //   if (!isUpload) return;
  //   getUserFeeds();
  //   // }
  // }, [isUpload]);

  const observerTarget = useRef(null);

  useIntersect(observerTarget, state.postNum, state.moreFeed, getUserFeeds);

  // useEffect(() => {
  //   if (!isUpload) return;
  //   getUserFeeds();
  //   setIsUpload(false);
  // }, [isUpload]);

  useEffect(() => {
    if (!club) {
      const getUserClub = async () => {
        const res = await api.get(`/product/${pageAccount}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClub(res.data.product);
      };

      getUserClub();
    }
  }, [club, pageAccount, token]);

  return (
    <div className="page">
      <HeaderBasic onModalInfo={handleModalInfo} />
      <main>
        {pageProfile ? (
          <>
            <UserProfile pageProfile={pageProfile} setIsUpload={setIsUpload} />
            {club ? <UserClub club={club} /> : <></>}
            <PostTypeSelectBar list={list} onListToggle={onListToggle} />
            <section>
              <h2 className="ir">유저 게시글</h2>
              {!postDataArray.length && (
                <>
                  <img src={defaultCatImg} alt="노트북을 들고 있는 고양이" className="mx-[auto] mt-[25%] mb-[3rem]" />
                  <p className="text-[1.6rem] text-center text-m-color">작성된 게시글이 없어요...ㅠㅠ</p>
                </>
              )}
              {postDataArray.length > 0 ? (
                list ? (
                  postDataArray.map((post) => <Post key={post.id} {...{ post }} {...{ setIsUpload }} />)
                ) : (
                  <section className="flex flex-wrap gap-[0.8rem] my-[1.6rem] mx-[1.6rem]">
                    <h2 className="ir">앨범형</h2>
                    {postDataArray.map((post) => (
                      <PostAlbum key={post.id} post={post} />
                    ))}
                  </section>
                )
              ) : (
                <></>
              )}
              {postDataArray.length > 0 && <div ref={observerTarget} className="h-[0.1rem]"></div>}
            </section>
          </>
        ) : (
          <></>
        )}
      </main>
      <Footer />
      {modal === true ? (
        <ModalInfo
          modalRef={modalRef}
          contentOne="설정 및 개인정보"
          contentTwo="로그아웃"
          onModalInfo={handleModalInfo}
          onModalAction={handleModalLogout}
        />
      ) : null}
      {logout === true ? (
        <Modal modalRef={modalRef} content="로그아웃하시겠어요?" value="로그아웃" onModalClose={handleCloseModal} />
      ) : null}
    </div>
  );
};

export default UserFeed;
