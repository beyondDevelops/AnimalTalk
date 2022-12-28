import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import api, { axiosImgUpload } from "../../api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import { HeaderSave } from "../../shared/Header/HeaderSave";

const EditProfile = () => {
  const upload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;
  const regex = /[^0-9a-zA-Z._]/g;

  const [profileImage, setProfileImage] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isWrong, setIsWrong] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [changeImage, setChangeImage] = useState(true);
  const [usernameLenght, setUsernameLenght] = useState(0);
  const [accountnameLength, setAccountnameLength] = useState(0);
  const [introLength, setIntroLength] = useState(0);

  const [myProfileData, setMyProfileData] = useState([]);

  const imgRef = useRef();
  const userNameRef = useRef();
  const accountNameRef = useRef();
  const introRef = useRef();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (usernameLenght >= 2 && accountnameLength >= 1 && introLength >= 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [usernameLenght, accountnameLength, introLength]);

  const handleUsernameLength = () => {
    setUsernameLenght(userNameRef.current.value.length);
  };

  const handleAccountnameLength = () => {
    setAccountnameLength(accountNameRef.current.value.length);
  };

  const handleIntroLength = () => {
    setIntroLength(introRef.current.value.length);
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await api.get("/user/myinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          setMyProfileData(res.data);
          setUsernameLenght(res.data.user.username.length);
          setAccountnameLength(res.data.user.accountname.length);
          setIntroLength(res.data.user.intro.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProfileData();
  }, []);

  if (myProfileData.user === undefined) {
    return;
  }

  const ImageFormData = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axiosImgUpload.post("/image/uploadfile", formData);
      if (res.status !== 200) {
        throw new Error(res.status, "통신에 실패했습니다.");
      }
      if (res.data.filename === undefined) {
        return;
      }
      return "https://mandarin.api.weniv.co.kr/" + res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  // 이미지 미리보기
  const imgPreview = () => {
    const uploadFile = imgRef.current.files[0];
    const maxSize = 10 * 1024 * 1024;
    const imgSize = uploadFile.size;

    if (maxSize < imgSize) {
      alert("이미지 용량은 10MB를 초과할 수 없습니다.");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(uploadFile);

    reader.onload = () => {
      setProfileImage(reader.result);
      setChangeImage(false);
    };
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    console.log();
    try {
      let imageURL = "";

      // 파일의 길이가 0이란소리는 이미지를 수정하지 않고 바로 저장했을 경우를 말합니다.
      // 따라서 이와같은 경우에는 기존에 저장되어있던 정보를 image에 그대로 보내주면 됩니다.
      if (imgRef.current.files.length === 0) {
        imageURL = myProfileData.user.image;
      }

      // 그게 아닌 경우라면 프로필 이미지를 수정한 경우라 수정한 데이터를 ImageFormData로 보내주어 수정을 진행합니다.
      imageURL = await ImageFormData(imgRef.current.files[0]);

      const res = await api.put(
        "/user",
        {
          user: {
            username: userNameRef.current.value,
            accountname: accountNameRef.current.value,
            intro: introRef.current.value,
            image: imageURL,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");

      if (regex.test(accountNameRef.current.value)) {
        alert("계정 ID에 한글은 입력이 불가능합니다.");
        return;
      }
      navigate(`/profile/${res.data.user.accountname}`);
    } catch (err) {
      if (err.response.data.message === "이미 사용중인 계정 ID입니다.") {
        setIsWrong(false);
        setErrMsg("이미 사용중인 계정 ID입니다.");
      }
      console.log(err);
    }
  };

  return (
    <div className="page">
      <HeaderSave isActive={btnDisabled ? false : true} btnText="저장" onSubmitForm={handleEditProfile} />
      <main className="h-screen flex flex-col">
        <form action="" className="flex flex-col items-center">
          <fieldset>
            <legend className="ir">프로필 사진 업로드</legend>
            <label htmlFor="imgUpload" className="block relative my-[3rem] cursor-pointer">
              <img
                src={changeImage ? myProfileData.user.image : profileImage}
                alt=""
                className="w-[11rem] h-[11rem] rounded-full"
              />
              <img src={upload} alt="" className="w-[3.6rem] h-[3.6rem] absolute right-0 bottom-0" />
            </label>
            <input ref={imgRef} id="imgUpload" type="file" accept="image/*" className="hidden" onChange={imgPreview} />
          </fieldset>

          <fieldset className="mb-[1.6rem]">
            <legend className="ir">사용자 이름</legend>

            <label htmlFor="name" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              사용자 이름
            </label>
            <input
              ref={userNameRef}
              id="name"
              type="text"
              placeholder="2~10자 이내여야 합니다."
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem]"
              maxLength="10"
              minLength="2"
              defaultValue={myProfileData.user.username}
              onChange={handleUsernameLength}
              required
            />
          </fieldset>

          <fieldset className="mb-[2.5rem]">
            <legend className="ir">계정 ID</legend>
            <label htmlFor="userId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              계정 ID
            </label>
            <input
              ref={accountNameRef}
              id="userId"
              type="text"
              placeholder="영문,숫자,특수문자(.),(_)만 사용 가능합니다."
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem]"
              defaultValue={myProfileData.user.accountname}
              onChange={handleAccountnameLength}
              pattern="[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]"
            />
            {isWrong ? null : <p className="absolute font-normal text-[1.2rem] text-[#EB5757] mt-[0.6rem]">{errMsg}</p>}
          </fieldset>

          <fieldset>
            <legend className="ir">소개</legend>
            <label htmlFor="intro" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              소개
            </label>
            <input
              ref={introRef}
              id="intro"
              type="text"
              placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem]"
              defaultValue={myProfileData.user.intro}
              onChange={handleIntroLength}
            />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
