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
  const editAccountname = location.state?.editAccountname;
  const myAccountname = location.state?.myAccountname;
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
  // const getUserFeeds = async () => {
  //   try {
  //     const res = await api.get(`/post/${pageAccount}/userpost/?limit=10&skip=${state.postNum}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setPostDataArray((prev) => [...prev, ...res.data.post]);
  //     setState((prev) => ({
  //       postNum: prev.postNum + 10,
  //       moreFeed: postDataArray.length % 10 === 0,
  //     }));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const observerTarget = useRef(null);
  // useIntersect(observerTarget, state.postNum, state.moreFeed, getUserFeeds);
  // ????????? ?????? ?????? ?????? ??? ??? ???????????? ??? ????????? ????????? ??? ???????????? ??????
  useEffect(() => {
    if (editAccountname || myAccountname) {
      setIsUpload(true);
    }
  }, [editAccountname, myAccountname]);
  // userFeed ????????? ??????
  useEffect(() => {
    if (!isUpload) return;
    const token = localStorage.getItem("token");
    const getPageProfile = async () => {
      try {
        const res = await api.get(`/profile/${pageAccount}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPageProfile(res.data.profile);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserFeeds = async () => {
      try {
        const res = await api.get(`/post/${pageAccount}/userpost/?limit=10&skip=${state.postNum}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostDataArray(res.data.post);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserClub = async () => {
      try {
        const res = await api.get(`/product/${pageAccount}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClub(res.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    getPageProfile();
    getUserFeeds();
    getUserClub();
    setIsUpload(false);
  }, [pageAccount, isUpload, postDataArray, pageProfile, state.postNum]);
  return (
    <div className="page">
      <HeaderBasic onModalInfo={handleModalInfo} />
      <main>
        {pageProfile ? (
          <>
            <UserProfile pageProfile={pageProfile} setIsUpload={setIsUpload} editAccountname={editAccountname} />
            {club ? <UserClub club={club} {...{ setIsUpload }} /> : <></>}
            <PostTypeSelectBar list={list} onListToggle={onListToggle} />
            <section>
              <h2 className="ir">?????? ?????????</h2>
              {!postDataArray.length && (
                <>
                  <img src={defaultCatImg} alt="???????????? ?????? ?????? ?????????" className="mx-[auto] mt-[25%] mb-[3rem]" />
                  <p className="text-[1.6rem] text-center text-m-color">????????? ???????????? ?????????...??????</p>
                </>
              )}
              {postDataArray.length === 0 && <></>}
              {postDataArray.length > 0 && list ? (
                postDataArray.map((post) => <Post key={post.id} {...{ post }} {...{ setIsUpload }} />)
              ) : (
                <section className="flex flex-wrap gap-[0.8rem] my-[1.6rem] mx-[1.6rem]">
                  <h2 className="ir">?????????</h2>
                  {postDataArray.map((post) => (
                    <PostAlbum key={post.id} post={post} />
                  ))}
                </section>
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
          contentOne="?????? ??? ????????????"
          contentTwo="????????????"
          onModalInfo={handleModalInfo}
          onModalAction={handleModalLogout}
        />
      ) : null}
      {logout === true ? (
        <Modal modalRef={modalRef} content="????????????????????????????" value="????????????" onModalClose={handleCloseModal} />
      ) : null}
    </div>
  );
};
export default UserFeed;
