import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import api, { axiosImgUpload } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { HeaderSave } from "../../shared/Header/HeaderSave";

const EditProfile = () => {
  const upload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;
  const defaultProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;
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
        throw new Error(res.status, "????????? ??????????????????.");
      }
      if (res.data.filename === undefined) {
        return;
      }
      return "https://mandarin.api.weniv.co.kr/" + res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  // ????????? ????????????
  const imgPreview = () => {
    const uploadFile = imgRef.current.files[0];
    const maxSize = 10 * 1024 * 1024;
    const imgSize = uploadFile.size;

    if (maxSize < imgSize) {
      alert("????????? ????????? 10MB??? ????????? ??? ????????????.");
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
    try {
      let imageURL = "";

      // ????????? ????????? 0??????????????? ???????????? ???????????? ?????? ?????? ???????????? ????????? ????????????.
      // ????????? ???????????? ???????????? ????????? ?????????????????? ????????? image??? ????????? ???????????? ?????????.
      if (imgRef.current.files.length === 0) {
        imageURL = myProfileData.user.image;
      }

      // ?????? ?????? ???????????? ????????? ???????????? ????????? ????????? ????????? ???????????? ImageFormData??? ???????????? ????????? ???????????????.
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

      if (res.status !== 200) throw new Error("?????????????????? ????????? ?????????????????????.");

      if (regex.test(accountNameRef.current.value)) {
        alert("?????? ID??? ????????? ????????? ??????????????????.");
        return;
      }
      navigate(`/profile/${res.data.user.accountname}`, { state: { editAccountname: `${res.data.user.accountname}` } });
    } catch (err) {
      if (err.response.data.message === "?????? ???????????? ?????? ID?????????.") {
        setIsWrong(false);
        setErrMsg("?????? ???????????? ?????? ID?????????.");
      }
      console.log(err);
    }
  };

  return (
    <div className="page">
      <HeaderSave isActive={btnDisabled ? false : true} btnText="??????" onSubmitForm={handleEditProfile} />
      <main className="h-screen flex flex-col">
        <form action="" className="flex flex-col items-center">
          <fieldset>
            <legend className="ir">????????? ?????? ?????????</legend>
            <label htmlFor="imgUpload" className="block relative my-[3rem] cursor-pointer">
              <img
                src={changeImage ? myProfileData.user.image : profileImage}
                alt=""
                className="w-[11rem] h-[11rem] rounded-full object-cover"
                onError={(e) => {
                  e.target.src = defaultProfile;
                }}
              />
              <img src={upload} alt="" className="w-[3.6rem] h-[3.6rem] absolute right-0 bottom-0" />
            </label>
            <input ref={imgRef} id="imgUpload" type="file" accept="image/*" className="hidden" onChange={imgPreview} />
          </fieldset>

          <fieldset className="mb-[1.6rem]">
            <legend className="ir">????????? ??????</legend>

            <label htmlFor="name" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              ????????? ??????
            </label>
            <input
              ref={userNameRef}
              id="name"
              type="text"
              placeholder="2~10??? ???????????? ?????????."
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
              maxLength="10"
              minLength="2"
              defaultValue={myProfileData.user.username}
              onChange={handleUsernameLength}
              required
            />
          </fieldset>

          <fieldset className="mb-[2.5rem]">
            <legend className="ir">?????? ID</legend>
            <label htmlFor="userId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              ?????? ID
            </label>
            <input
              ref={accountNameRef}
              id="userId"
              type="text"
              placeholder="??????,??????,????????????(.),(_)??? ?????? ???????????????."
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
              defaultValue={myProfileData.user.accountname}
              onChange={handleAccountnameLength}
              pattern="[???-???|???-???|???-???]"
            />
            {isWrong ? null : <p className="absolute font-normal text-[1.2rem] text-[#EB5757] mt-[0.6rem]">{errMsg}</p>}
          </fieldset>

          <fieldset>
            <legend className="ir">??????</legend>
            <label htmlFor="intro" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              ??????
            </label>
            <input
              ref={introRef}
              id="intro"
              type="text"
              placeholder="????????? ??????????????? ??????????????????. (5?????? ??????)"
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
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
