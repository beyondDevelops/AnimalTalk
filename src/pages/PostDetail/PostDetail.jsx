import React, { useEffect } from "react";
import { HeaderBasic } from "../../shared/Header/HeaderBasic";
import Post from "../../shared/Post/Post";
import PostChatList from "./PostChatList";
import PostDetailForm from "./PostDetailForm";

const PostDetail = ({ post }) => {
  post = {
    id: "63aa471f17ae6665815c85a4",
    content: "내용",
    image: "1672103709318.jpg, 1672103709518.jpg",
    createdAt: "2022-12-27T01:15:11.157Z",
    updatedAt: "2022-12-27T01:15:11.157Z",
    hearted: false,
    heartCount: 0,
    comments: [],
    commentCount: 0,
    author: {
      _id: "63a3a65017ae666581e724a1",
      username: "jytest",
      accountname: "jytest",
      intro: "",
      image: "http://146.56.183.55:5050/Ellipse.png",
      isfollow: false,
      following: ["63a3a50f17ae666581e71d35", "63a3a53917ae666581e71deb"],
      follower: ["63a3a53917ae666581e71deb", "63a3a50f17ae666581e71d35"],
      followerCount: 2,
      followingCount: 2,
    },
  };

  return (
    <>
      <div className="page">
        <HeaderBasic />
        <main>
          <Post {...{ post }} />
          <ul className="border-t-[0.1rem] px-[1.6rem] py-[2rem] border-cst-light-gray">
            <PostChatList />
            <PostChatList />
            <PostChatList />
            <PostChatList />
            <PostChatList />
            <PostChatList />
          </ul>
        </main>
        <PostDetailForm postId={post.id} />
      </div>
    </>
  );
};

export default PostDetail;
