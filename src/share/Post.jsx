import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ModalPostImg from "../components/ModalPostImg/ModalPostImg";

const Post = ({ post }) => {
  // Note: 팔로잉 유저가 있는 사용자가 처음 로그인 시 Home에서 확인할 수 있는 게시물 포스트를 기준으로 작성되었습니다.
  // Note: 사용자 닉네임, 계정아이디, 게시물 정보(업로드 일시, 좋아요 갯수, 댓글 내용 및 갯수, 포스팅 이미지, 포스팅한 글)를 받아오게 됩니다.
  // Note: 아래 변수는 임시로 구현되었으며, 실제로는 API와 props를 이용합니다.

  // 아래 이미지 변수는 기본 설정입니다.
  const profileManSmallImg = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const moreVerticalSmallImg = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;
  const heartOffImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart-off.png`;
  const heartOnImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart-on.png`;
  const commentImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;

  // 이미지 관리 및 모달 처리
  const postImg = post.image
    ? post.image
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3KKxatmkx5h29Eilsm2Myj78RjMqgMOvv71gY7N6z1YrS-2C2N9IHGS2V5HXgejTXUk&usqp=CAU";
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState(false);

  const handleModalToggle = () => {
    modal ? setModal(false) : setModal(true);
  };

  // 좋아요 관리x
  const [isLike, setIsLike] = useState(post.hearted);

  const handleLikeBtn = () => {
    setIsLike(!isLike);
    // Note: 여기서 좋아요 데이터를 처리합니다.
  };

  // 날짜 정보 관리
  const postDate = post.updatedAt
    ? post.updatedAt.slice(0, 10).replaceAll("-", "")
    : post.createdAt.slice(0, 10).replaceAll("-", "");
  const year = postDate.slice(0, 4);
  const month = postDate.slice(4, 6);
  const date = postDate.slice(6, 8);

  return (
    <section className="my-[2rem] mx-[1.6rem]">
      <img
        className="inline-block w-[4.2rem] h-[4.2rem]"
        src={profileManSmallImg}
        alt={`${post.author.username}님 방문하기`}
      />
      <p className="inline-block align-middle ml-[1.2rem]">
        <strong className="leading-[1.8rem] font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
          {post.author.username}
        </strong>
        <span className="block mt-[0.2rem] text-[1.2rem] leading-[1rem] text-cst-gray">
          @&nbsp;{post.author.accountname}
        </span>
      </p>
      <img
        className="float-right w-[1.8rem] h-[1.8rem] mt-[0.4rem] cursor-pointer"
        src={moreVerticalSmallImg}
        alt="더보기"
      />

      <p className="leading-[1.8rem] mt-[1.6rem] ml-[5.4rem]">{post.content}</p>

      {/* Note: 캐러셀 부분 */}
      <div className="relative overflow-hidden w-[30.4rem] h-[22.8rem] mt-[1.6rem] ml-[5.4rem] mb-[1.4rem] rounded-[10px]">
        {postImg && postImg.includes(", ") ? (
          <>
            <div className="flex flex-row h-full overflow-x-scroll scrollbar-hide" ref={imgRef}>
              {postImg.split(", ").map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className={`min-w-full object-cover cursor-pointer ${
                    postImg.split(", ")[currentIndex] === img ? "" : "hidden"
                  }`}
                  onClick={handleModalToggle}
                />
              ))}
              {modal ? (
                <ModalPostImg imgArr={postImg.split(", ")} modal={modal} onModalToggle={handleModalToggle} />
              ) : (
                <></>
              )}
            </div>
            <div className="relative flex justify-center -translate-y-[2rem]">
              {postImg.split(", ").map((img, idx) => (
                <button
                  onClick={() => setCurrentIndex(postImg.split(", ").indexOf(img))}
                  key={idx}
                  id={idx}
                  className={`mr-[0.6rem] last:mr-0 text-white w-[0.6rem] h-[0.6rem] rounded-[50%] ${
                    postImg.split(", ")[currentIndex] === img ? "bg-m-color" : "bg-white"
                  }`}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex h-full">
              <img
                src={postImg}
                alt=""
                className="min-w-full object-cover cursor-pointer"
                onClick={handleModalToggle}
              />
            </div>
            {modal ? <ModalPostImg imgArr={[postImg]} modal={modal} onModalToggle={handleModalToggle} /> : <></>}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handleLikeBtn}
        className="inline-flex items-center ml-[5.4rem] mr-[1.8rem] text-cst-gray align-bottom"
      >
        <img className="w-[2rem] h-[2rem]" src={`${isLike ? heartOnImg : heartOffImg}`} alt="좋아요" />
        <span className="text-[1.2rem] leading-[1.2rem] ml-[0.6rem]">{post.heartCount}</span>
      </button>
      <Link to="/chat" className="inline-flex items-center text-cst-gray align-bottom">
        <img className="w-[2rem] h-[2rem]" src={commentImg} alt="댓글 확인하기" />
        <span className="text-[1.2rem leading-[1.2rem] ml-[0.6rem]">{post.commentCount}</span>
      </Link>
      <time
        dateTime={`${year}-${month}-${date}`}
        className="block ml-[5.4rem] mt-[1.8rem] mb-[0.4rem] text-[1rem] leading-[1.2rem] text-[#767676]"
      >
        {year}년 {month}월 {date}일
      </time>
    </section>
  );
};

export default Post;
