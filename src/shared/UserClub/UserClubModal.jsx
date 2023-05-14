import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const UserClubModal = ({ setIsClubModal, clubData, comma, setIsUpload }) => {
  const modalRef = useRef([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { _id } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const clubImage = clubData.itemImage.includes("https")
    ? clubData.itemImage
    : "https://api.mandarin.weniv.co.kr/" + clubData.itemImage;
  const clubName = clubData.itemName;
  const clubFee = comma(clubData.price);
  const clubLocation = clubData.link;

  const handleModal = (e) => {
    if (e.target === modalRef.current["background"]) {
      setIsClubModal(false);
    }
    if (e.target === modalRef.current["closeBtn"]) {
      setIsClubModal(false);
    }
    if (e.target === modalRef.current["cancle"]) {
      setModalDelete(false);
      setIsClubModal(false);
    }
  };

  const handleClubDelete = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);

      const res = await instance.delete(`/product/${clubData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsUpload(true);
      setIsClubModal(false);

      if (res.status !== 200) {
        setIsDisabled(false);
        throw new Error(res.status, "통신에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClubReport = (e) => {
    e.preventDefault();
    alert("신고가 접수되었습니다.");
  };

  return (
    <>
      <section
        className="absolute inset-0 z-30"
        ref={(el) => (modalRef.current["background"] = el)}
        onClick={handleModal}
      >
        <h3 className="ir">게시글 사진 모달</h3>
        <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[39rem] h-[75%] rounded-t-[10px] bg-orange-200 overflow-auto scrollbar-hide">
          <button
            ref={(el) => (modalRef.current["closeBtn"] = el)}
            type="button"
            aria-label="닫기창"
            className="relative w-[100%] h-[3.6rem] border-b-[0.1rem] border-b-white before:absolute before:left-[50%] before:-translate-x-[50%] before:content-[''] before:w-[5rem] before:h-[0.4rem] before:bg-white before:hover:bg-m-color"
            onClick={handleModal}
          ></button>
          {clubData.author._id === _id ? (
            <Link
              className="relative inline-block ml-[27.5rem] mr-[2rem] mt-[1.5rem] text-[1.2rem] text-cst-gray before:absolute before:left-[3.1rem] before:bottom-[0.8rem] before:content-[''] before:w-[0.3rem] before:h-[0.3rem] before:rounded-full before:bg-cst-gray hover:text-m-color"
              to={`clubupload/${clubData.id}`}
              state={{ clubData: clubData }}
            >
              수정
            </Link>
          ) : (
            <></>
          )}
          <form className={clubData.author._id === _id ? "inline-block" : "ml-[32rem] mt-[1.5rem]"}>
            <button
              type={clubData.author._id === _id ? "button" : "submit"}
              className="text-[1.2rem] text-cst-gray hover:text-m-color"
              onClick={
                clubData.author._id === _id
                  ? () => {
                      setModalDelete(true);
                    }
                  : handleClubReport
              }
              disabled={isDisabled}
            >
              {clubData.author._id === _id ? "삭제" : "신고"}
            </button>
          </form>
          <img
            src={clubImage}
            alt=""
            className="w-[30.4rem] h-[22.8rem] rounded-[10px] mx-auto mt-[1rem] mb-[2rem] object-cover"
          />
          <p className="mx-[5rem] text-[1.2rem] w-[29rem] font-medium text-cst-gray">
            모임명
            <strong className="block text-[1.4rem] mt-[0.4rem] mb-[1.8rem] py-[0.4rem] text-black font-normal border-b-[0.1rem] border-b-white">
              {clubName}
            </strong>
          </p>
          <p className="mx-[5rem] text-[1.2rem] w-[29rem] font-medium text-cst-gray">
            참가비
            <strong className="block text-[1.4rem] mt-[0.4rem] mb-[1.8rem] py-[0.4rem] text-black font-normal border-b-[0.1rem] border-b-white">
              {clubFee}원
            </strong>
          </p>
          <p className="mx-[5rem] text-[1.2rem] w-[29rem] font-medium text-cst-gray">
            장소
            <strong className="block text-[1.4rem] mt-[0.4rem] mb-[1.8rem] py-[0.4rem] text-black font-normal border-b-[0.1rem] border-b-white">
              {clubLocation}
            </strong>
          </p>
        </div>
      </section>
      {modalDelete && (
        <section className="absolute inset-0 z-50 bg-black/20">
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
              <button onClick={handleClubDelete} disabled={isDisabled} className="px-[5rem] py-[1.4rem] text-m-color">
                삭제
              </button>
            </fieldset>
          </form>
        </section>
      )}
    </>
  );
};

export default UserClubModal;
