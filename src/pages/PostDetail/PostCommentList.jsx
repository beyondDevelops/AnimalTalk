import { forwardRef } from "react";
import { detailDate } from "../../utils/date";

// Note: comment 정보를 props로 받음 (댓글, 소유자 정보)
const PostCommentList = forwardRef(({ comment, setIsModal, setUserId, setCommentId }, ref) => {
  const imgMore = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-small.png`;

  const handleModal = () => {
    setUserId(comment.author._id);
    setCommentId(comment.id);
    setIsModal(true);
  };

  const nowDate = detailDate(comment.createdAt);

  const userImage = comment.author.image;

  const commentContent = (
    <>
      <img src={userImage} alt="" className="inline-block w-[3.6rem] h-[3.6rem] object-cover rounded-full" />
      <p className="inline-block ml-[1.2rem]">
        <strong className="font-medium">{comment.author.accountname}</strong>
        <span className="relative align-middle text-cst-gray text-[1rem] ml-[1.4rem] before:content-[''] before:w-[0.2rem] before:h-[0.2rem] before:rounded-full before:absolute before:left-[-0.6rem] before:bottom-[0.6rem] before:bg-cst-gray">
          {nowDate}
        </span>
      </p>
      <button type="button" className="float-right mt-[0.6rem]" onClick={handleModal}>
        <img src={imgMore} alt="더보기" className="w-[2rem] h-[2rem]" />
      </button>
      <p className="ml-[4.8rem]">{comment.content}</p>
    </>
  );

  const commentList = ref ? (
    <li className="mb-[1.2rem] last:mb-0" ref={ref}>
      {commentContent}
    </li>
  ) : (
    <li className="mb-[1.2rem] last:mb-0">{commentContent}</li>
  );

  return commentList;
});

export default PostCommentList;
