import React, { useRef, useState } from "react";

const ChatRoomFooter = () => {
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/icon-image.png`;
  const inpText = useRef();
  const [isText, setIsText] = useState(false);
  const [isImg, setIsImg] = useState(false);

  const handleTextValid = () => {
    if (inpText.current.value) {
      setIsText(true);
    } else if (inpText.current.value === "") {
      setIsText(false);
    }
  };

  const handleImgValid = (e) => {
    if (e.target.files) {
      setIsImg(true);
    } else setIsImg(false);
  };

  return (
    <footer>
      <form className="flex py-[1.2rem] px-[1.6rem]">
        <fieldset>
          <legend className="ir">사진 업로드</legend>
          <label htmlFor="upload" className="shrink-0 bg-[#C4C4C4] w-[3.6rem] h-[3.6rem] rounded-[50%] flex">
            <img src={imgUpload} alt="" className="w-[2.2rem] h-[2.2rem] mx-auto my-auto " />
          </label>
          <input onChange={handleImgValid} id="upload" type="file" className="hidden" />
        </fieldset>

        <fieldset className="basis-full flex">
          <legend className="ir">텍스트 입력</legend>
          <label htmlFor="text" className="ir">
            텍스트 :
          </label>
          <input
            ref={inpText}
            id="text"
            type="text"
            placeholder="메시지 입력하기..."
            className="mx-[0.8rem] rounded-[20px] px-[1.2rem] justify-center basis-full"
            onChange={handleTextValid}
          />
        </fieldset>

        <button type="button" className={`shrink-0  ${isText || isImg ? "text-m-color" : "text-[#C4C4C4]"}`}>
          전송
        </button>
      </form>
    </footer>
  );
};

export default ChatRoomFooter;
