import React from "react";

const Post = (/* props */) => {
  // Note: 팔로잉 유저가 있는 사용자가 처음 로그인 시 Home에서 확인할 수 있는 게시물 포스트를 기준으로 작성되었습니다.
  // Note: 사용자 닉네임, 계정아이디, 게시물 정보(업로드 일시, 좋아요 갯수, 댓글 내용 및 갯수, 포스팅 이미지, 포스팅한 글)를 받아오게 됩니다.
  // Note: 아래 변수는 임시로 구현되었으며, 실제로는 API와 props를 이용합니다.

  // 아래 이미지 변수는 기본 설정입니다.
  const profileManSmallImg = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const moreVerticalSmallImg = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;
  const likeImg = `${process.env.PUBLIC_URL}/assets/img/icon-heart.png`;
  const commentImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;

  return (
    <section className="relative w-[358px] flex flex-row mx-[16px] my-[20px]">
      <h2 className="ir">게시글</h2>
      <div className="basis-[42px] shrink-0 mr-[12px]">
        <img className="h-[42px]" src={profileManSmallImg} alt="(OOO님 방문하기)" />
      </div>
      <div className="post_item flex flex-col mb-[4px]">
        <div className="w-[200px] mb-[16px]">
          <strong className="text-[14px] leading-[18px] font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
            애월읍 위니브 감귤농장에 놀러왔으면 오이를 사가야하는게 기본 아닌가요?
          </strong>
          <p className="text-[12px] leading-[14px] font-normal mt-[2px] text-[#767676]">@ weniv_Mandarin</p>
        </div>
        <img className="absolute mt-[4px] w-[18px] h-[18px] right-[0px]" src={moreVerticalSmallImg} alt="더보기" />
        <div className="mb-[16px]">
          <p className="font-normal text-[14px] leading-[18px]">
            옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
            약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
          </p>
        </div>
        <div className="img_and_icons">
          <div className="box-border rounded-[10px] border-[0.5px] border-[#dbdbdb] overflow-hidden mb-[12px]">
            <img
              className="w-full h-full"
              src="https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt=""
            />
          </div>
          <div className="flex flex-row mb-[16px]">
            <button type="button" className="flex items-center mr-[16px] text-[#767676]">
              <img className="w-[20px] h-[20px]" src={likeImg} alt="좋아요" />
              <span className="text-[12px] leading-[12px] ml-[6px]">58</span>
            </button>
            <button type="button" className="flex items-center mr-[16px] text-[#767676]">
              <img className="w-[20px] h-[20px]" src={commentImg} alt="댓글 확인하기" />
              <span className="text-[12px] leading-[12px] ml-[6px]">12</span>
            </button>
          </div>
        </div>
        <span className="text-[10px] font-normal leading-[12px] text-[#767676]">2020년 10월 21일</span>
      </div>
    </section>
  );
};

export default Post;
