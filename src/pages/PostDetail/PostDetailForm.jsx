import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";

const PostDetailForm = ({ postId }) => {
  const inpTextRef = useRef();
  const [isText, setIsText] = useState(false);

  const { image } = useContext(UserContext);
  const profileImage =
    image === "http://146.56.183.55:5050/Ellipse.png" ? image : `https://mandarin.api.weniv.co.kr/${image}`;

  const handleTextValid = (e) => {
    e.target.value ? setIsText(true) : setIsText(false);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `/post/${postId}/comments`,
        {
          comment: {
            content: inpTextRef.current.value,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status !== 200) throw new Error(res.status, "통신에 실패했습니다.");
      inpTextRef.current.value = "";
      setIsText(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="flex py-[1.2rem] px-[1.6rem] border-t-[1px] border-cst-light-gray">
      <img src={profileImage} alt="" className="w-[3.6rem] h-[3.6rem] object-cover rounded-full" />

      <fieldset className="basis-full flex">
        <legend className="ir">텍스트 입력</legend>
        <label htmlFor="text" className="ir">
          텍스트 :
        </label>
        <input
          ref={inpTextRef}
          id="text"
          type="text"
          placeholder="댓글 입력하기..."
          className="mx-[0.8rem] rounded-[20px] px-[1.2rem] justify-center basis-full"
          onChange={handleTextValid}
        />
      </fieldset>

      <button
        className={`shrink-0  ${isText ? "text-m-color" : "text-[#C4C4C4]"}`}
        onClick={handleSubmitForm}
        disabled={!isText}
      >
        게시
      </button>
    </form>
  );
};

export default PostDetailForm;
