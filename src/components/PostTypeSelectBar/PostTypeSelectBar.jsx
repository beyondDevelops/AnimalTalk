import React from "react";

const PostTypeSelectBar = ({ list, onListToggle }) => {
  const postListOn = `${process.env.PUBLIC_URL}/assets/img/icon-post-list-on.png`;
  const postListOff = `${process.env.PUBLIC_URL}/assets/img/icon-post-list-off.png`;
  const postAlbumOn = `${process.env.PUBLIC_URL}/assets/img/icon-post-album-on.png`;
  const postAlbumOff = `${process.env.PUBLIC_URL}/assets/img/icon-post-album-off.png`;

  return (
    <div className="py-[0.9rem] px-[1.6rem] flex justify-end border-t-[0.6rem] border-b-[0.05rem] border-cst-light-gray">
      <button className="w-[2.6rem] h-[2.6rem]" type="button" aria-label="리스트형" onClick={onListToggle}>
        <img src={list ? postListOn : postListOff} alt="" />
      </button>
      <button className="w-[2.6rem] h-[2.6rem] ml-[1.6rem]" type="button" aria-label="앨범형" onClick={onListToggle}>
        <img src={list ? postAlbumOff : postAlbumOn} alt="" />
      </button>
    </div>
  );
};

export default PostTypeSelectBar;
