import React, { useState } from "react";
import ModalPostImg from "../../components/ModalModule/ModalPostImg";

const PostAlbum = ({ post, idx }) => {
  const [modal, setModal] = useState(false);

  const imgLayersImg = `${process.env.PUBLIC_URL}/assets/img/icon-img-layers.png`;

  const handleModalToggle = () => {
    modal ? setModal(false) : setModal(true);
  };

  const postImg = !!post.image.split(",")[0] ? post.image : null;

  return (
    <div
      className={`relative overflow-hidden w-[11.4rem] h-[11.4rem] mb-[0.8rem] ${
        (idx + 1) % 3 === 0 ? "mr-0" : "mr-[0.8rem]"
      } rounded-[10px]`}
    >
      <div className="relative flex h-full">
        {postImg && postImg.includes(",") ? (
          <>
            <button type="button" className="absolute top-[0.6rem] right-[0.6rem]">
              <img src={imgLayersImg} alt="" className="w-[2rem] h-[2rem]" />
            </button>
            {postImg.split(",").map((img) => (
              <img
                src={img.includes("https") ? img : `https://mandarin.api.weniv.co.kr/${img}`}
                alt=""
                className="min-w-full object-cover cursor-pointer"
                onClick={handleModalToggle}
              />
            ))}
            {modal ? (
              <ModalPostImg imgArr={postImg.split(",")} modal={modal} onModalToggle={handleModalToggle} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <img
              src={postImg.includes("https") ? postImg : `https://mandarin.api.weniv.co.kr/${postImg}`}
              alt=""
              className="min-w-full object-cover cursor-pointer"
              onClick={handleModalToggle}
            />
            {modal ? (
              <ModalPostImg imgArr={postImg.split(",")} modal={modal} onModalToggle={handleModalToggle} />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostAlbum;
