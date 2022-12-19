import React from "react";

const PostAlbum = ({ post }) => {
  const imgLayersImg = `${process.env.PUBLIC_URL}/assets/img/icon-img-layers.png`;

  const handleImgAdd = () => {};

  const postImg = post.image
    ? post.image
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3KKxatmkx5h29Eilsm2Myj78RjMqgMOvv71gY7N6z1YrS-2C2N9IHGS2V5HXgejTXUk&usqp=CAU";
  return (
    <div className="relative flex h-full">
      {postImg && postImg.includes(", ") ? (
        <>
          <button type="button" className="absolute top-[0.6rem] right-[0.6rem]">
            <img src={imgLayersImg} alt="" className="w-[2rem] h-[2rem]" />
          </button>
          {postImg.split(", ").map((img) => (
            <img src={img} alt="" className="min-w-full object-cover" />
          ))}
        </>
      ) : (
        <img src={postImg} alt="" className="min-w-full object-cover" />
      )}
    </div>
  );
};

export default PostAlbum;
