import React, { forwardRef } from "react";

// Note: userId에 따라 댓글 신고와 삭제 구분
const PostModal = forwardRef(({ setIsModal, userId }, modalRef) => {
  const handleModal = (e) => {
    if (e.target === modalRef.current) {
      setIsModal(false);
    }
  };

  console.log(userId);

  return (
    <section className="absolute inset-0" ref={modalRef} onClick={handleModal}>
      <h3 className="ir">댓글 모달창</h3>
      <div
        ref={modalRef}
        className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-white w-[39rem] h-[9.2rem] rounded-t-[10px] shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]"
      ></div>
    </section>
  );
});

export default PostModal;
