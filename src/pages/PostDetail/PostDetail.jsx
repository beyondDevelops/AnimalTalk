import React, { useEffect, useState } from "react";
import { Header } from "../../shared/Header/Header";
import Post from "../../shared/Post/Post";
import PostChatList from "./PostChatList";
import PostDetailForm from "./PostDetailForm";
import PostChatModal from "./PostChatModal";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const yellowAnimalTalk = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

  const location = useLocation();
  const postId = location.state.post.id;

  const [post, setPost] = useState(null);

  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [isUpload, setIsUpload] = useState(true);

  useEffect(() => {
    if (!isUpload) return;
    const token = localStorage.getItem("token");

    // 채팅 정보 업데이트
    const getChatList = async () => {
      try {
        const res = await axios.get(`/post/${postId}/comments/?limit=${Infinity}&skip=0`, {
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

    // 게시글 정보 업데이트
    const getPost = async () => {
      try {
        const res = await axios.get(`/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) throw new Error(res.status, "통신에 실패했습니다.");
        setPost(res.data.post);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  return (
    <>
      {!!post && (
        <>
          <Header headerFor="basic" />

          <main>
            <Post {...{ post }} />
            <ul className="border-t-[0.1rem] px-[1.6rem] py-[2rem] border-cst-light-gray">
              {!commentList.length && (
                <>
                  <img
                    src={yellowAnimalTalk}
                    alt="노트북을 보는 노란 고양이 애니몰톡 로고입니다."
                    className="inline-block w-[4rem] h-[4rem]"
                  />
                  <p className="inline-block w-[26rem] ml-[0.5rem] text-cst-gray whitespace-nowrap overflow-ellipsis overflow-hidden align-middle">
                    입력된 댓글이 없다냥...
                  </p>
                </>
              )}
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
              // ref={modalRef}
              {...{ setIsModal }}
              {...{ userId }}
              {...{ commentId }}
              {...{ setIsUpload }}
              postId={post.id}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default PostDetail;
