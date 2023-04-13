import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../shared/Header/Header";
import Post from "../../shared/Post/Post";
import PostChatList from "./PostChatList";
import PostDetailForm from "./PostDetailForm";
import PostChatModal from "./PostChatModal";
import NoComment from "../../components/NoComment/NoComment";
import { instance } from "../../api/axios";
import { useLocation } from "react-router-dom";
import { readCommentList } from "../../api/Comment/readCommentList";
import { useInfiniteQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";

const PostDetail = () => {
  const location = useLocation();
  const postId = location.state.post.id;

  const [post, setPost] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [isUpload, setIsUpload] = useState(true);
  // 댓글 리스트 무한 스크롤 기능
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["comment"],
    ({ pageParam = 0 }) => readCommentList(postId, pageParam),
    {
      enabled: isUpload,
      getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    }
  );
  const observerTarget = useRef(null);
  const lastCommentRef = useCallback(
    (comment) => {
      if (isFetchingNextPage) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      observerTarget.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (comment) observerTarget.current.observe(comment);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (!isUpload) return;
    const token = localStorage.getItem("token");

    // 게시글 정보 업데이트
    const getPost = async () => {
      try {
        const res = await instance.get(`/post/${postId}`, {
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

  const content =
    data?.pages.length === 0 ? (
      <NoComment />
    ) : (
      data?.pages.map((page) => {
        return page?.map((comment, idx) => {
          if (page.length === idx + 1) {
            return (
              <PostChatList
                key={uuidv4()}
                {...{ comment }}
                {...{ setCommentId }}
                {...{ setIsModal }}
                {...{ setUserId }}
                ref={lastCommentRef}
              />
            );
          }
          return (
            <PostChatList
              key={uuidv4()}
              {...{ comment }}
              {...{ setCommentId }}
              {...{ setIsModal }}
              {...{ setUserId }}
            />
          );
        });
      })
    );

  return (
    <>
      {!!post && (
        <>
          <Header headerFor="basic" />
          <main>
            <Post {...{ post }} />
            <ul className="border-t-[0.1rem] px-[1.6rem] py-[2rem] border-cst-light-gray">{content}</ul>
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
