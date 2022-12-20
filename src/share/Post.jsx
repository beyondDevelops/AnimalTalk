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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const imgRef = useRef();

  // Note: 이미지를 전송할 때 (,)를 기준으로 하나의 문자열로 전송한다고 가정했습니다.
  const filenames = "1640066364747.png,1640066364748.png,1640066364749.png".split(",");
  const images = [
    {
      id: filenames[0],
      url: "https://cdn.pixabay.com/photo/2022/06/06/10/55/cat-7245850__480.jpg",
    },
    {
      id: filenames[1],
      url: "https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016__480.jpg",
    },
    {
      id: filenames[2],
      url: "https://cdn.pixabay.com/photo/2012/02/28/00/49/snow-17854_1280.jpg",
    },
  ];

  const handleLikeBtn = () => {
    setIsLike(!isLike);
    // Note: 여기서 좋아요 데이터를 처리합니다.
  };

  // Note: transform이 먹지 않습니다..
  const handleCarousel = (e) => {
    console.log(e.target.id);
    if (e.target.id === 1) {
      if (currentIndex === 0) {
        imgRef.style.transform = `translateX(-304px)`;
        // imgRef.style.transform = `translate-x-[-304px]`;
        // imgRef.classList.add("tranlate-x-[-304px]");
        // setCurrentIndex(1);
      }
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
        <span className="block text-[1.2rem] leading-[1rem] font-normal text-cst-gray">@ weniv_Mandarin</span>
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
        <div ref={imgRef} className="flex h-full overflow-x-auto scrollbar-hide">
          {images.map((image) => (
            <img key={image.id} src={image.url} alt="" className={`min-w-full object-cover`} />
          ))}
        </div>
        <div className="relative flex justify-center -translate-y-[2rem]">
          {images.map((image, index) =>
            images.length > 1 ? (
              <button
                onClick={handleCarousel}
                key={image.id}
                id={index}
                className={`mr-[0.6rem] last:mr-0 text-white bg-white w-[0.6rem] h-[0.6rem] rounded-[50%] ${
                  images[currentIndex].id === image.id ? "bg-m-color" : "bg-white"
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
        className="inline-flex items-center ml-[5.4rem] mr-[1.8rem] text-cst-gray align-bottom"
      >
        <img className="w-[2rem] h-[2rem]" src={`${isLike ? heartOnImg : heartOffImg}`} alt="좋아요" />
        <span className="text-[1.2rem] leading-[1.2rem] ml-[0.6rem]">58</span>
      </button>
      <Link to="/chat" className="inline-flex items-center text-cst-gray align-bottom">
        <img className="w-[2rem] h-[2rem]" src={commentImg} alt="댓글 확인하기" />
        <span className="text-[1.2rem leading-[1.2rem] ml-[0.6rem]">12</span>
      </Link>
      <time
        dateTime="2020-10-21"
        className="block ml-[5.4rem] mt-[1.8rem] mb-[0.4rem] text-[1rem] leading-[1.2rem] text-cst-gray"
      >
        2020년 10월 21일
      </time>
    </section>
  );
};

export default Post;
