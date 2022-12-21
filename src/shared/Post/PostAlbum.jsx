import React, { useState } from "react";
import ModalPostImg from "../../components/ModalModule/ModalPostImg";

const PostAlbum = ({ post, idx }) => {
  const [modal, setModal] = useState(false);

  const imgLayersImg = `${process.env.PUBLIC_URL}/assets/img/icon-img-layers.png`;

  const handleModalToggle = () => {
    modal ? setModal(false) : setModal(true);
  };

  const postImg = post.image
    ? post.image
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3KKxatmkx5h29Eilsm2Myj78RjMqgMOvv71gY7N6z1YrS-2C2N9IHGS2V5HXgejTXUk&usqp=CAU";

  return (
    <div
      className={`relative overflow-hidden w-[11.4rem] h-[11.4rem] mb-[0.8rem] ${
        (idx + 1) % 3 === 0 ? "mr-0" : "mr-[0.8rem]"
      } rounded-[10px]`}
    >
      <div className="relative flex h-full">
        {postImg && postImg.includes(", ") ? (
          <>
            <button type="button" className="absolute top-[0.6rem] right-[0.6rem]">
              <img src={imgLayersImg} alt="" className="w-[2rem] h-[2rem]" />
            </button>
            {postImg.split(", ").map((img) => (
              <img src={img} alt="" className="min-w-full object-cover cursor-pointer" onClick={handleModalToggle} />
            ))}
            {modal ? (
              <ModalPostImg imgArr={postImg.split(", ")} modal={modal} onModalToggle={handleModalToggle} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <img src={postImg} alt="" className="min-w-full object-cover cursor-pointer" onClick={handleModalToggle} />
            {modal ? <ModalPostImg imgArr={[postImg]} modal={modal} onModalToggle={handleModalToggle} /> : <></>}
          </>
        )}
      </div>
    </div>
  );
};

export default PostAlbum;
