import React, { forwardRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";

// Note: userId에 따라 댓글 신고와 삭제 구분
const PostModal = forwardRef(({ setIsModal, userId, onSubmitForm }, modalRef) => {
  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setIsModal(false);
    }
  };
  console.log(userId);

  const { _id } = useContext(UserContext);

  return (
    <section className="absolute inset-0" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">댓글 모달창</h3>
      <div
        ref={modalRef}
        className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-white w-[39rem] h-[9.2rem] rounded-t-[10px] shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]"
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
            onClick={onSubmitForm}
          >
            {userId === _id ? "삭제" : "신고하기"}
          </button>
        </form>
      </div>
    </section>
  );
});

export default PostModal;
