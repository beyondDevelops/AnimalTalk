import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
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
import { UserContext } from "../../context/UserContext";

const UserFeed = () => {
  const loadingImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

  const token = localStorage.getItem("token");

  const [pageProfile, setPageProfile] = useState(null);
  const [list, setList] = useState(true);
  const [postDataArray, setPostDataArray] = useState(null);
  const [club, setClub] = useState(null);
  const [follow, setFollow] = useState(false);

  const [modal, setModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const modalRef = useRef();

  const location = useLocation();
  const pageAccount = location.pathname.split("/")[2];
  const { accountname } = useContext(UserContext);

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

  useEffect(() => {
    if (!pageProfile) {
      const getPageProfile = async () => {
        try {
          const res = await api.get(`/profile/${pageAccount}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPageProfile(res.data.profile);
          // 로그인한 사용자를 기준으로 타인의 피드 페이지에서 나와의 follow 관계를 isfollow로 확인
          // 상대방과 로그인한 사용자의 팔로우 여부를 follow에 저장
          setFollow(res.data.profile.isfollow);
        } catch (err) {
          console.log(err);
        }
      };
      getPageProfile();
    }
  }, [pageAccount, token, pageProfile]);

  useEffect(() => {
    if (!postDataArray) {
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
    }
  }, [pageAccount, postDataArray, token]);

  const onListToggle = () => {
    setList(!list);
  };

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

  useEffect(() => {
    if (!!pageProfile) {
      // 현재 follow 상태와 상대방의 프로필 데이터 요청을 통해 얻어진 나와의 팔로우 관계 정보가 저장된 follow 데이터 비교

      // follow 상태 변동 없음
      if (follow === pageProfile.isfollow) {
        return;
      } else if (follow !== pageProfile.isfollow && follow === true) {
        // follow 상태 변동이 있고, 현재 팔로우를 한 경우 (팔로우 요청을 하여야 함)
        const followReq = async () => {
          // 로그인한 사용자의 토큰으로 상대방 계정이 포함된 api url 통신을 하여야 함
          await api.post(
            `/profile/${pageAccount}/follow`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        };
        followReq();
      } else if (follow !== pageProfile.isfollow && follow === false) {
        // follow 상태 변동이 있고, 현재 팔로우를 취소한 경우 (언팔로우를 요청하여야 함)
        const unfollowReq = async () => {
          await api.delete(`/profile/${pageAccount}/unfollow`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        };
        unfollowReq();
      }
    }
  }, [follow, accountname, token, pageProfile, pageAccount]);

  return (
    <div className="page">
      <HeaderBasic onModalInfo={handleModalInfo} />
      <main>
        {pageProfile ? (
          <>
            <UserProfile pageProfile={pageProfile} follow={follow} setFollow={setFollow} />
            {club ? <UserClub club={club} /> : <></>}
            <PostTypeSelectBar list={list} onListToggle={onListToggle} />
            <section>
              <h2 className="ir">유저 게시글</h2>
              {!postDataArray && <p className="mt-[30%] text-[2.4rem] text-center">아직 생성된 게시글이 없어요 ㅠㅠ</p>}
              {postDataArray ? (
                list ? (
                  postDataArray.map((post, idx) => <Post key={post.id} post={post} />)
                ) : (
                  <section className="flex flex-wrap my-[1.6rem] mx-[1.6rem]">
                    <h2 className="ir">앨범형</h2>
                    {postDataArray.map((post, idx) => (
                      <PostAlbum key={post.id} post={post} idx={idx} />
                    ))}
                  </section>
                )
              ) : (
                <img src={loadingImg} alt="잠시만 기다려 주세요." />
              )}
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
