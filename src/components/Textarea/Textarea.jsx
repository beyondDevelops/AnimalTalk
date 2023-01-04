import React, { forwardRef } from "react";

const Textarea = forwardRef(({ setIsText }, textareaRef) => {
  // const textareaRef = useRef();
  const handleTextareaResize = (e) => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    if (textareaRef.current.value) {
      setIsText(true);
    } else if (textareaRef.current.value === "") {
      setIsText(false);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      name=""
      id=""
      cols="30"
      rows="1"
      placeholder="게시글 입력하기..."
      className="w-[30.4rem] p-[0.2rem] mt-[1.2rem] mb-[1.6rem] ml-[1.2rem] align-bottom overflow-hidden resize-none focus:outline-none"
      onChange={handleTextareaResize}
    ></textarea>
  );
});

export default Textarea;
