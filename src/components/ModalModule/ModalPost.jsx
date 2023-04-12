import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const ModalPost = ({ setModalPost, post, setIsUpload }) => {
  const modalRef = useRef([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { _id } = useContext(AuthContext);
  const { image } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const handleModal = (e) => {
    if (e.target === modalRef.current["select"]) {
      setModalPost(false);
    }
    if (e.target === modalRef.current["cancle"]) {
      setModalDelete(false);
      setModalPost(false);
    }
  };

  // 게시글 삭제
  const handlePostDelete = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);

      const res = await instance.delete(`/post/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsUpload(true);
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

      const res = await instance.post(`/post/${post.id}/report`, [], {
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
    <>
      <section className="absolute inset-0 z-10" ref={(el) => (modalRef.current["select"] = el)} onClick={handleModal}>
        <h3 className="ir">게시글 모달창</h3>
        <div className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-white w-[39rem] rounded-t-[10px] shadow-[0_-2px_6px_-3px_rgba(0,0,0,0.8)]">
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
              type={post.author._id === _id ? "button" : "submit"}
              className="py-[1.6rem] px-[2.6rem] w-[100%] hover:bg-s-color text-left hover:ease-in hover:transition hover:duration-300"
              onClick={
                post.author._id === _id
                  ? () => {
                      setModalDelete(true);
                    }
                  : handlePostReport
              }
              disabled={isDisabled}
            >
              {post.author._id === _id ? "삭제" : "신고하기"}
            </button>
          </form>
          {post.author._id === _id ? (
            <Link
              to={"/postedit"}
              state={{ ...{ post, image: `${image}` } }}
              className="inline-block py-[1.6rem] px-[2.6rem] w-[100%] hover:bg-s-color text-left hover:ease-in hover:transition hover:duration-300"
            >
              수정
            </Link>
          ) : (
            <></>
          )}
        </div>
      </section>
      {modalDelete && (
        <section className="absolute inset-0 z-20 bg-black/20">
          <h4 className="ir">삭제 확인 모달창</h4>
          <form className="absolute bottom-[40%] left-[50%] -translate-x-[50%] bg-white w-[25.2rem] rounded-[10px]">
            <fieldset>
              <legend className="px-[5.4rem] py-[2.2rem] text-[1.6rem] font-medium border-b-cst-light-gray border-b-[0.1rem]">
                게시글을 삭제할까요?
              </legend>
              <button
                ref={(el) => (modalRef.current["cancle"] = el)}
                type="button"
                onClick={handleModal}
                className="px-[4.9rem] py-[1.4rem] border-r-cst-light-gray border-r-[0.1rem]"
              >
                취소
              </button>
              <button onClick={handlePostDelete} disabled={isDisabled} className="px-[5rem] py-[1.4rem] text-m-color">
                삭제
              </button>
            </fieldset>
          </form>
        </section>
      )}
    </>
  );
};

export default ModalPost;
