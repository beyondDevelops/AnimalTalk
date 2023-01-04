import React, { useState } from "react";
import ModalPostImg from "../../components/ModalModule/ModalPostImg";

const PostAlbum = ({ post }) => {
  const imgLayersImg = `${process.env.PUBLIC_URL}/assets/img/icon-img-layers.png`;
  const postImg = !!post.image.split(",")[0] ? post.image : null;
  const [modalPostImg, setModalPostImg] = useState(false);

  return (
    <>
      {postImg ? (
        <>
          {/* 이미지 캐러셀  */}
          <div className={`relative overflow-hidden w-[11.4rem] h-[11.4rem] rounded-[10px]`}>
            <div className="relative flex h-full">
              {postImg.includes(",") ? (
                <>
                  <img src={imgLayersImg} alt="" className="absolute top-[0.6rem] right-[0.6rem] w-[2rem] h-[2rem]" />
                  {postImg.split(",").map((img) => (
                    <img
                      key={crypto.randomUUID()}
                      src={img.includes("https") ? img : `https://mandarin.api.weniv.co.kr/${img}`}
                      alt=""
                      className="min-w-full object-cover cursor-pointer"
                      onClick={() => {
                        setModalPostImg(!modalPostImg);
                      }}
                    />
                  ))}
                </>
              ) : (
                <>
                  <img
                    src={postImg.includes("https") ? postImg : `https://mandarin.api.weniv.co.kr/${postImg}`}
                    alt=""
                    className="min-w-full object-cover cursor-pointer"
                    onClick={() => {
                      setModalPostImg(!modalPostImg);
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* 모달창 */}
          {modalPostImg ? <ModalPostImg imgArr={postImg.split(",")} {...{ setModalPostImg }} {...{ post }} /> : <></>}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostAlbum;
