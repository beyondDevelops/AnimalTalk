import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import ModalPost from "../../components/ModalModule/ModalPost";
import ModalPostImg from "../../components/ModalModule/ModalPostImg";

const Post = ({ post, setIsUpload }) => {
  // 아래 이미지 변수는 기본 설정입니다.
  const profileSmallImg =
    post.author.image !== "http://146.56.183.55:5050/Ellipse.png"
      ? post.author.image
      : `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const moreVerticalSmallImg = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;
  const heartOffImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart-off.png`;
  const heartOnImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart-on.png`;
  const commentImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;

  // 포스트 이미지 및 모달 처리
  const postImg = post.image && !!post.image.split(",")[0] ? post.image : null;
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalPostImg, setModalPostImg] = useState(false);

  // 게시글 삭제 및 신고 모달
  const [modalPost, setModalPost] = useState(false);

  // 날짜 정보 관리
  const postDate = post.updatedAt.slice(0, 10).replaceAll("-", "");
  const year = postDate.slice(0, 4);
  const month = postDate.slice(4, 6);
  const date = postDate.slice(6, 8);

  // 유저 클릭 시 페이지 이동
  const navigate = useNavigate();

  // 좋아요 관리
  const [isLike, setIsLike] = useState(post.hearted);
  const [likeCount, setLikeCount] = useState(post.heartCount);

  const handleLikeBtn = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");

      const res = isLike
        ? await axios.delete(`/post/${post.id}/unheart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await axios.post(`/post/${post.id}/heart`, [], {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      if (res.status !== 200) throw new Error(res.status, "통신에 실패했습니다.");
      setIsLike(res.data.post.hearted);
      setLikeCount(res.data.post.heartCount);
    } catch (err) {
      console.log(err);
    }
  };

  // 유저 클릭 시 페이지 이동
  const handleLink = () => navigate(`/profile/${post.author.accountname}`);

  return (
    <>
      <section className="my-[2rem] mx-[1.6rem]">
        <img
          tabIndex="0"
          className="inline-block w-[4.2rem] h-[4.2rem] rounded-full object-cover cursor-pointer"
          src={profileSmallImg}
          alt={`${post.author.username}님 프로필 사진입니다. 클릭 시 해당 프로필 유저 페이지로 이동합니다.`}
          onClick={handleLink}
          onError={(e) => {
            e.target.src = profileSmallImg;
          }}
        />
        <p className="inline-block align-middle ml-[1.2rem] cursor-pointer" onClick={handleLink}>
          <strong className="leading-[1.8rem] font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
            {post.author.username}
          </strong>
          <span className="block mt-[0.2rem] text-[1.2rem] leading-[1rem] text-cst-gray">
            @ {post.author.accountname}
          </span>
        </p>

        <button
          type="button"
          className="float-right mt-[0.6rem]"
          onClick={() => {
            setModalPost(true);
          }}
        >
          <img className="w-[1.8rem] h-[1.8rem]" src={moreVerticalSmallImg} alt="더보기" />
        </button>

        <p className={`leading-[1.8rem] mt-[1.6rem] ml-[5.4rem] ${postImg ? "" : "mb-[1.4rem]"}`}>{post.content}</p>

        {/* 이미지 캐러셀 부분 */}
        {postImg ? (
          <div className="relative overflow-hidden w-[30.4rem] h-[22.8rem] mt-[1.6rem] ml-[5.4rem] mb-[1.4rem] rounded-[10px]">
            {postImg.includes(",") ? (
              <>
                <div className="flex flex-row h-full overflow-x-scroll scrollbar-hide" ref={imgRef}>
                  {postImg.split(",").map((img, idx) => (
                    <img
                      key={idx}
                      src={img.includes("https") ? img : `https://mandarin.api.weniv.co.kr/${img}`}
                      alt=""
                      className={`min-w-full object-cover cursor-pointer ${
                        postImg.split(",")[currentIndex] === img ? "" : "hidden"
                      }`}
                      onClick={() => {
                        setModalPostImg(!modalPostImg);
                      }}
                    />
                  ))}
                </div>
                <div className="relative flex justify-center -translate-y-[2rem]">
                  {postImg.split(",").map((img, idx) => (
                    <button
                      onClick={() => setCurrentIndex(postImg.split(",").indexOf(img))}
                      key={idx}
                      id={idx}
                      className={`mr-[0.6rem] last:mr-0 text-white w-[0.6rem] h-[0.6rem] rounded-[50%] ${
                        postImg.split(",")[currentIndex] === img ? "bg-m-color" : "bg-white"
                      }`}
                    ></button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-full">
                <img
                  src={postImg.includes("https") ? postImg : `https://mandarin.api.weniv.co.kr/${postImg}`}
                  alt=""
                  className="min-w-full object-cover cursor-pointer"
                  onClick={() => {
                    setModalPostImg(!modalPostImg);
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}

        <form className="inline-flex align-bottom">
          <button onClick={handleLikeBtn} className="inline-flex items-center ml-[5.4rem] mr-[1.8rem] text-cst-gray">
            <img className="w-[2rem] h-[2rem]" src={isLike ? heartOnImg : heartOffImg} alt="좋아요" />
            <span className="text-[1.2rem] leading-[1.2rem] ml-[0.6rem]">{likeCount}</span>
          </button>
        </form>
        <Link
          to={`/post/${post.id}`}
          state={{ ...{ post } }}
          className="inline-flex items-center text-cst-gray align-bottom"
        >
          <img className="w-[2rem] h-[2rem]" src={commentImg} alt="댓글 확인하기" />
          <span className="text-[1.2rem] leading-[1.2rem] ml-[0.6rem]">{post.commentCount}</span>
        </Link>
        <time
          dateTime={`${year}-${month}-${date}`}
          className="block ml-[5.4rem] mt-[1.8rem] mb-[0.4rem] text-[1rem] leading-[1.2rem] text-[#767676]"
        >
          {year}년 {month}월 {date}일
        </time>
      </section>

      {modalPostImg ? <ModalPostImg imgArr={postImg.split(",")} {...{ setModalPostImg }} {...{ post }} /> : <></>}

      {modalPost ? <ModalPost {...{ setModalPost }} {...{ post }} {...{ setIsUpload }} /> : <></>}
    </>
  );
};

export default Post;
