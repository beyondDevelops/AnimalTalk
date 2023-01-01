import React, { useContext, useRef, useState } from "react";
import axios from "../../api/axios";
import { UserContext } from "../../context/UserContext";

const ModalPoast = ({ setModalPost, post }) => {
  const modalRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);
  const { _id } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setModalPost(false);
    }
  };

  // 게시글 삭제
  const handlePostDelete = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);

      const res = await axios.delete(`/post/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setIsUpload(true);
      setModalPost(false);

      if (res.status !== 200) {
        setIsDisabled(false);
        throw new Error(res.status, "통신에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 게시글 신고
  const handlePostReport = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);

      const res = await axios.post(`/post/${post.id}/report`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalPost(false);
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
    <section className="absolute inset-0 z-10" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">게시글 모달창</h3>
      <div
        ref={modalRef}
        className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-white w-[39rem] rounded-t-[10px] shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]"
      >
        <button
          type="button"
          aria-label="닫기창"
          className="relative w-[100%] h-[3.6rem] before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-cst-light-gray before:hover:bg-s-color "
          onClick={() => {
            setModalPost(false);
          }}
        ></button>
        <form>
          <button
            className="py-[1.6rem] px-[2.6rem] w-[100%] hover:bg-s-color text-left hover:ease-in hover:transition hover:duration-300"
            onClick={post.author._id === _id ? handlePostDelete : handlePostReport}
            disabled={isDisabled}
          >
            {post.author._id === _id ? "삭제" : "신고하기"}
          </button>
          {post.author._id === _id ? (
            <button
              className="py-[1.6rem] px-[2.6rem] w-[100%] hover:bg-s-color text-left hover:ease-in hover:transition hover:duration-300"
              // onClick={userId === _id ? handleChatDelete : handleChatReport}
              // disabled={isDisabled}
            >
              수정
            </button>
          ) : (
            <></>
          )}
        </form>
      </div>
    </section>
  );
};

export default ModalPoast;
