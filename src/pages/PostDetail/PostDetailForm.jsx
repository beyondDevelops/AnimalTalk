import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createCommentList } from "../../api/Comment/createComment";

const PostDetailForm = ({ postId, setIsUpload }) => {
  const inpTextRef = useRef();
  const [isText, setIsText] = useState(false);

  const { image } = useContext(AuthContext);

  const handleTextValid = (e) => {
    e.target.value ? setIsText(true) : setIsText(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsText(false);

    // 댓글 생성
    await createCommentList(postId, inpTextRef.current.value);

    inpTextRef.current.value = "";
    setIsUpload(true);
  };

  useEffect(() => {
    inpTextRef.current.focus();
  }, []);

  return (
    <form className="flex py-[1.2rem] px-[1.6rem] border-t-[1px] border-cst-light-gray z-0">
      <img src={image} alt="" className="w-[3.6rem] h-[3.6rem] object-cover rounded-full" />

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
          className="mx-[0.8rem] rounded-[20px] px-[1.2rem] justify-center basis-full outline-m-color"
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
