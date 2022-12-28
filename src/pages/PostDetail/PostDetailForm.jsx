import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";

const PostDetailForm = ({ post }) => {
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/icon-image.png`;
  const inpText = useRef();
  const [isText, setIsText] = useState(false);

  const handleTextValid = () => {
    if (inpText.current.value) {
      setIsText(true);
    } else if (inpText.current.value === "") {
      setIsText(false);
    }
  };

  const { image } = useContext(UserContext);
  // const image = "1672103709318.jpg";

  const profileImage =
    image === "http://146.56.183.55:5050/Ellipse.png" ? image : `https://mandarin.api.weniv.co.kr/${image}`;

  return (
    <footer>
      <form className="flex py-[1.2rem] px-[1.6rem]">
        <img src={profileImage} alt="" className="w-[3.6rem] h-[3.6rem] object-cover rounded-full" />

        <fieldset className="basis-full flex">
          <legend className="ir">텍스트 입력</legend>
          <label htmlFor="text" className="ir">
            텍스트 :
          </label>
          <input
            ref={inpText}
            id="text"
            type="text"
            placeholder="댓글 입력하기..."
            className="mx-[0.8rem] rounded-[20px] px-[1.2rem] justify-center basis-full"
            onChange={handleTextValid}
          />
        </fieldset>

        <button type="button" className={`shrink-0  ${isText ? "text-m-color" : "text-[#C4C4C4]"}`}>
          전송
        </button>
      </form>
    </footer>
  );
};

export default PostDetailForm;
