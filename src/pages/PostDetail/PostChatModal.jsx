import React, { useContext, useRef, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

// Note: userId에 따라 댓글 신고와 삭제 구분
const PostModal = ({ setIsModal, postId, userId, commentId, setIsUpload }) => {
  const modalRef = useRef([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleModal = (e) => {
    if (e.target === modalRef.current["select"]) {
      setIsModal(false);
    }
    if (e.target === modalRef.current["cancle"]) {
      setModalDelete(false);
      setIsModal(false);
    }
  };

  const { _id } = useContext(AuthContext);

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
    <>
      <section className="absolute inset-0" ref={(el) => (modalRef.current["select"] = el)} onClick={handleModal}>
        <h3 className="ir">댓글 모달창</h3>
        <div className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-white w-[39rem] rounded-t-[10px] shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]">
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
              type={userId === _id ? "button" : "submit"}
              className="py-[1.6rem] px-[2.6rem] w-[100%] hover:bg-s-color text-left hover:ease-in hover:transition hover:duration-300"
              onClick={
                userId === _id
                  ? () => {
                      setModalDelete(true);
                    }
                  : handleChatReport
              }
              disabled={isDisabled}
            >
              {userId === _id ? "삭제" : "신고하기"}
            </button>
          </form>
        </div>
      </section>
      {modalDelete && (
        <section className="absolute inset-0 z-20 bg-black/20">
          <h4 className="ir">삭제 확인 모달창</h4>
          <form className="absolute bottom-[40%] left-[50%] -translate-x-[50%] bg-white w-[25.2rem] rounded-[10px]">
            <fieldset>
              <legend className="px-[5.4rem] py-[2.2rem] text-[1.6rem] font-medium border-b-cst-light-gray border-b-[0.1rem]">
                댓글을 삭제할까요?
              </legend>
              <button
                ref={(el) => (modalRef.current["cancle"] = el)}
                type="button"
                onClick={handleModal}
                className="px-[4.9rem] py-[1.4rem] border-r-cst-light-gray border-r-[0.1rem]"
              >
                취소
              </button>
              <button onClick={handleChatDelete} disabled={isDisabled} className="px-[5rem] py-[1.4rem] text-m-color">
                삭제
              </button>
            </fieldset>
          </form>
        </section>
      )}
    </>
  );
};

export default PostModal;
