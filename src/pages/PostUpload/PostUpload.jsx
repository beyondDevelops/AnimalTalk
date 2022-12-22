import React, { useCallback, useEffect, useRef, useState } from "react";
import { HeaderSave } from "../../shared/Header/HeaderSave";
import Textarea from "../../components/Textarea/Textarea";
import { axiosImgUpload } from "../../api/axios";

const PostUpload = () => {
  const myProfile = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;
  const imgCancle = `${process.env.PUBLIC_URL}/assets/img/icon-x.png`;

  const textareaRef = useRef();

  const [isText, setIsText] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImgURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1 || images.length > 4) return;
    const newImageURLs = [];
    images.map((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImgURLs(newImageURLs);
  }, [images]);

  const handleImgUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleImgCancle = (e) => {
    const newImageURLs = imageURLs.filter((_, index) => index !== parseInt(e.target.id));
    setImgURLs(newImageURLs);
  };

  const onSubmitForm = useCallback(async (e) => {
    try {
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="page">
      {/* Note: Header 수정 필요 */}
      <HeaderSave btnText="업로드" isActive={isText} {...{ onSubmitForm }} />
      <main className="pt-[2rem] px-[1.6rem]">
        <img src={myProfile} alt="" className="inline-block align-top w-[4.2rem] h-[4.2rem] object-cover" />
        <form className="inline-block">
          <Textarea ref={textareaRef} {...{ setIsText }} />
        </form>
        {imageURLs.length ? (
          imageURLs.length === 1 ? (
            <>
              {/* key 돌 때 index 사용... */}
              {imageURLs.map((imgURL, index) => (
                <div key={index} className="relative">
                  <img src={imgURL} alt="" className="w-[30.4rem] h-[22.8rem] ml-auto object-cover rounded-[10px]" />
                  <button type="button" onClick={handleImgCancle}>
                    <img
                      src={imgCancle}
                      id={index}
                      alt=""
                      className="w-[2rem] h-[2rem] absolute top-[1.1rem] right-[1.1rem]"
                    />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="flex overflow-hidden overflow-x-auto w-[30.4rem] ml-[5.4rem]">
              {imageURLs.map((imgURL, index) => (
                <div key={index} className="relative first:ml-0 ml-[0.8rem] shrink-0">
                  <img
                    // key={index}
                    src={imgURL}
                    alt=""
                    className="w-[16.8rem] h-[12.6rem] object-cover rounded-[10px]"
                  />
                  <button type="button" onClick={handleImgCancle}>
                    <img
                      src={imgCancle}
                      id={index}
                      alt=""
                      className="w-[1.5rem] h-[1.5rem] absolute top-[1.1rem] right-[1.1rem]"
                    />
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <></>
        )}
      </main>

      <form className="p-[1.6rem]">
        <fieldset>
          <legend className="ir">사진 업로드</legend>
          <label htmlFor="imgUpload" className="block ml-auto w-[5rem] h-[5rem]">
            <img src={imgUpload} alt="" className="w-[5rem] h-[5rem] ml-auto cursor-pointer" />
          </label>
          <input id="imgUpload" multiple accept="image/*" type="file" className="hidden" onChange={handleImgUpload} />
        </fieldset>
      </form>
    </div>
  );
};

export default PostUpload;