import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Post = (/* props */) => {
  // Note: 팔로잉 유저가 있는 사용자가 처음 로그인 시 Home에서 확인할 수 있는 게시물 포스트를 기준으로 작성되었습니다.
  // Note: 사용자 닉네임, 계정아이디, 게시물 정보(업로드 일시, 좋아요 갯수, 댓글 내용 및 갯수, 포스팅 이미지, 포스팅한 글)를 받아오게 됩니다.
  // Note: 아래 변수는 임시로 구현되었으며, 실제로는 API와 props를 이용합니다.

  // 아래 이미지 변수는 기본 설정입니다.
  const profileManSmallImg = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const moreVerticalSmallImg = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;
  const heartOffImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart-off.png`;
  const heartOnImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart-on.png`;
  const commentImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;

  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLike, setIsLike] = useState(false);

  // Note: 이미지를 전송할 때 (,)를 기준으로 하나의 문자열로 전송한다고 가정했습니다.
  const images =
    "https://cdn.pixabay.com/photo/2022/06/06/10/55/cat-7245850__480.jpg, https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016__480.jpg, https://cdn.pixabay.com/photo/2012/02/28/00/49/snow-17854_1280.jpg";
  const imageArr = images.split(", ");

  const handleLikeBtn = () => {
    setIsLike(!isLike);
    // Note: 여기서 좋아요 데이터를 처리합니다.
  };

  const handleCarousel = (el, pos) => {
    let currentPos = el.scrollLeft;
    if (currentPos < pos) {
      el.scrollLeft += pos;
    } else if (currentPos > pos) {
      if (pos === 0) {
        el.scrollLeft = 0;
      }
      el.scrollLeft -= pos;
    }
    /* Carousel 버튼 색깔 변화 기능 */
    if (el.scrollLeft === 0) {
      setCurrentIndex(0);
    } else if (el.scrollLeft === 304) {
      setCurrentIndex(1);
    } else if (el.scrollLeft === 608) {
      setCurrentIndex(2);
    }
  };

  return (
    <section className="my-[2rem] mx-[1.6rem]">
      <h2 className="ir">유저 게시글</h2>
      {/* Note: 유저 사진, 닉네임, 아이디, 게시글 */}
      <img className="inline-block w-[4.2rem] h-[4.2rem]" src={profileManSmallImg} alt="(OOO님 방문하기)" />
      <p className="inline-block align-middle ml-[1.2rem]">
        <strong className="leading-[1.8rem] font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
          애월읍 위니브 감귤농장
        </strong>
        <span className="block text-[1.2rem] leading-[1rem] font-normal text-[#767676]">@ weniv_Mandarin</span>
      </p>
      <img
        className="float-right w-[1.8rem] h-[1.8rem] mt-[0.4rem] cursor-pointer"
        src={moreVerticalSmallImg}
        alt="더보기"
      />

      <p className="font-normal leading-[1.8rem] mt-[1.6rem] ml-[5.4rem]">
        옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
        약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
      </p>

      {/* Note: 캐러셀 부분 */}
      <div className="relative overflow-hidden w-[30.4rem] h-[22.8rem] mt-[1.6rem] ml-[5.4rem] mb-[1.4rem] rounded-[10px]">
        <div className="flex h-full overflow-x-scroll scrollbar-hide" ref={imgRef}>
          {imageArr.map((image, idx) => (
            <img key={idx} src={image} alt="" className="min-w-full object-cover" />
          ))}
        </div>
        <div className="relative flex justify-center -translate-y-[2rem]">
          {imageArr.map((image, idx) =>
            imageArr.length > 1 ? (
              <button
                onClick={() => handleCarousel(imgRef.current, 304 * idx)}
                key={idx}
                id={idx}
                className={`mr-[0.6rem] last:mr-0 text-white w-[0.6rem] h-[0.6rem] rounded-[50%] ${
                  currentIndex === idx ? "bg-m-color" : "bg-white"
                }`}
              ></button>
            ) : (
              <></>
            )
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLikeBtn}
        className="inline-flex items-center ml-[5.4rem] mr-[1.8rem] text-[#767676] align-bottom"
      >
        <img className="w-[2rem] h-[2rem]" src={`${isLike ? heartOnImg : heartOffImg}`} alt="좋아요" />
        <span className="text-[1.2rem] leading-[1.2rem] ml-[0.6rem]">58</span>
      </button>
      <Link to="/chat" className="inline-flex items-center text-[#767676] align-bottom">
        <img className="w-[2rem] h-[2rem]" src={commentImg} alt="댓글 확인하기" />
        <span className="text-[1.2rem leading-[1.2rem] ml-[0.6rem]">12</span>
      </Link>
      <time
        dateTime="2020-10-21"
        className="block ml-[5.4rem] mt-[1.8rem] mb-[0.4rem] text-[1rem] leading-[1.2rem] text-[#767676]"
      >
        2020년 10월 21일
      </time>
    </section>
  );
};

export default Post;
