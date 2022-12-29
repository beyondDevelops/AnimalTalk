import React, { useEffect, useRef, useState } from "react";
import { HeaderBasic } from "../../shared/Header/HeaderBasic";
import Post from "../../shared/Post/Post";
import PostChatList from "./PostChatList";
import PostDetailForm from "./PostDetailForm";
import PostChatModal from "./PostChatModal";
import axios from "../../api/axios";

const PostDetail = ({ post }) => {
  // Note: 데이터 확인용 post, 조립 후 삭제
  // post = {
  //   id: "63aa471f17ae6665815c85a4",
  //   content: "내용",
  //   image: "1672103709318.jpg, 1672103709518.jpg",
  //   createdAt: "2022-12-27T01:15:11.157Z",
  //   updatedAt: "2022-12-27T01:15:11.157Z",
  //   hearted: false,
  //   heartCount: 0,
  //   comments: [],
  //   commentCount: 0,
  //   author: {
  //     _id: "63a3a65017ae666581e724a1",
  //     username: "jytest",
  //     accountname: "jytest",
  //     intro: "",
  //     image: "http://146.56.183.55:5050/Ellipse.png",
  //     isfollow: false,
  //     following: ["63a3a50f17ae666581e71d35", "63a3a53917ae666581e71deb"],
  //     follower: ["63a3a53917ae666581e71deb", "63a3a50f17ae666581e71d35"],
  //     followerCount: 2,
  //     followingCount: 2,
  //   },
  // };

  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [isUpload, setIsUpload] = useState(true);

  const modalRef = useRef();

  useEffect(() => {
    if (!isUpload) return;
    const getChatList = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/post/${post.id}/comments/?limit=${Infinity}&skip=0`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) throw new Error(res.status, "통신에 실패했습니다.");
        setCommentList(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    getChatList();
    setIsUpload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  return (
    <>
      <div className="page">
        <HeaderBasic />

        <main>
          <Post {...{ post }} />
          <ul className="border-t-[0.1rem] px-[1.6rem] py-[2rem] border-cst-light-gray">
            {!!commentList.length &&
              commentList.map((comment) => (
                <PostChatList
                  key={crypto.randomUUID()}
                  {...{ comment }}
                  {...{ setCommentId }}
                  {...{ setIsModal }}
                  {...{ setUserId }}
                />
              ))}
          </ul>
        </main>

        <PostDetailForm postId={post.id} {...{ setIsUpload }} />

        {/* Note: modal에 comment list의 author._id를 내려줘야 함 */}
        {isModal ? (
          <PostChatModal
            ref={modalRef}
            {...{ setIsModal }}
            {...{ userId }}
            {...{ commentId }}
            {...{ setIsUpload }}
            postId={post.id}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PostDetail;
