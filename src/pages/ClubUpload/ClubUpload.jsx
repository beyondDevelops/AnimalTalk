import React from "react";
import { HeaderSave } from "../../shared/Header/HeaderSave";

const ClubUpload = () => {
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/img-button.png`;

  const handleImgUpload = () => {};

  return (
    <div className="page">
      <HeaderSave btnText="저장" isActive={true} />
      <main>
        <form className="mt-[3rem] mx-[3.4rem]">
          <fieldset className="relative mb-[3rem]">
            <legend className="text-[1.2rem] text-cst-gray mb-[1.8rem]">이미지 등록</legend>

            <div className="w-[32.2rem] h-[20.4rem] bg-[#F2F2F2] border-solid-[0.5rem] border-cst-light-gray rounded-[10px]">
              <img
                src="https://cdn.pixabay.com/photo/2020/11/28/06/15/cold-5783718_640.jpg"
                alt=""
                className="w-[32.2rem] h-[20.4rem] object-cover rounded-[10px]"
              />
            </div>

            <label
              htmlFor="imgUpload"
              className="absolute block w-[3.6rem] h-[3.6rem] bottom-0 right-0 mr-[1.2rem] mb-[1.2rem]"
            >
              <img src={imgUpload} alt="" className="w-[3.6rem] h-[3.6rem] cursor-pointer" />
            </label>
            <input id="imgUpload" multiple accept="image/*" type="file" className="hidden" onChange={handleImgUpload} />
          </fieldset>

          <fieldset>
            <legend className="ir">상세 내용</legend>

            <label htmlFor="name" className="text-[1.2rem] text-cst-gray font-medium">
              모임명
            </label>
            <input
              id="name"
              type="text"
              className="block w-[32.2rem] py-[0.8rem] border-b-[0.1rem] border-b-cst-light-gray mb-[1.6rem] focus:outline-none"
              placeholder="2~5자 이내여야 합니다."
            />

            <label htmlFor="price" className="text-[1.2rem] text-cst-gray font-medium">
              참가비
            </label>
            <input
              id="proce"
              type="number"
              className="block w-[32.2rem] py-[0.8rem] border-b-[0.1rem] border-b-cst-light-gray mb-[1.6rem] focus:outline-none"
              placeholder="숫자만 입력 가능합니다."
            />

            <label htmlFor="text" className="text-[1.2rem] text-cst-gray font-medium">
              장소
            </label>
            <input
              id="text"
              type="text"
              className="block w-[32.2rem] py-[0.8rem] border-b-[0.1rem] border-b-cst-light-gray focus:outline-none"
              placeholder="장소를 입력해주세요."
            />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default ClubUpload;
