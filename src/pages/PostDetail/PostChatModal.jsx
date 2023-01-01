import React, { useContext, useRef, useState } from "react";
import axios from "../../api/axios";
import { UserContext } from "../../context/UserContext";

// Note: userId에 따라 댓글 신고와 삭제 구분
const PostModal = ({ setIsModal, postId, userId, commentId, setIsUpload }) => {
  const modalRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setIsModal(false);
    }
  };

  const { _id } = useContext(UserContext);

  const token = localStorage.getItem("token");

  // 댓글 삭제
  const handleChatDelete = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);

      const res = await axios.delete(`/post/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsUpload(true);
      setIsModal(false);

      if (res.status !== 200) {
        setIsDisabled(false);
        throw new Error(res.status, "통신에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 댓글 신고
  const handleChatReport = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);

      const res = await axios.post(`/post/${postId}/comments/${commentId}/report`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModal(false);
      if (res.status !== 200) {
        setIsDisabled(false);
        throw new Error(res.status, "통신에 실패했습니다.");
      }
      alert("신고가 접수되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="absolute inset-0" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">댓글 모달창</h3>
      <div
        ref={modalRef}
        className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-white w-[39rem] rounded-t-[10px] shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]"
      >
        <button
          type="button"
          aria-label="닫기창"
          className="relative w-[100%] h-[3.6rem] before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-cst-light-gray before:hover:bg-s-color "
          onClick={() => {
            setIsModal(false);
          }}
        ></button>
        <form>
          <button
            className="py-[1.6rem] px-[2.6rem] w-[100%] hover:bg-s-color text-left hover:ease-in hover:transition hover:duration-300"
            onClick={userId === _id ? handleChatDelete : handleChatReport}
            disabled={isDisabled}
          >
            {userId === _id ? "삭제" : "신고하기"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostModal;
