import { useRef, useState, useEffect } from "react";
import api, { axiosImgUpload } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { HeaderSave } from "../../shared/Header/HeaderSave";

const EditProfile = () => {
  const upload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;
  const defaultProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;
  const regex = /[^0-9a-zA-Z._]/g;

  const navigate = useNavigate();

  const imgRef = useRef();
  const inputRef = useRef([]);

  const [profileImage, setProfileImage] = useState(false);
  const [changeImage, setChangeImage] = useState(true);

  const [myProfileData, setMyProfileData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isWrong, setIsWrong] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    accountname: "",
    intro: "",
  });

  const [isActive, setIsActive] = useState(false);

  const leastLength = {
    usernameleast: 2,
    accountnameleast: 1,
    introleast: 5,
  };

  const token = localStorage.getItem("token");

  const handleFormData = (e) => {
    if (e.target.id === "username") {
      setFormData({ ...formData, username: inputRef.current["username"].value });
    } else if (e.target.id === "accountname") {
      setFormData({ ...formData, accountname: inputRef.current["accountname"].value });
    } else if (e.target.id === "intro") {
      setFormData({ ...formData, intro: inputRef.current["intro"].value });
    }
  };

  const handleUsernameLengthCheck = () => {
    if (inputRef.current["username"].value.length < leastLength.usernameleast) {
      return false;
    }
    return true;
  };

  const handleAccountnameLengthCheck = () => {
    if (inputRef.current["accountname"].value.length < leastLength.accountnameleast) {
      return false;
    }
    return true;
  };

  const handleIntroLengthCheck = () => {
    if (inputRef.current["intro"].value.length < leastLength.introleast) {
      return false;
    }
    return true;
  };

  const handleBtnControl = () => {
    const usernameValidationResult = handleUsernameLengthCheck();
    const accountnameValidationResult = handleAccountnameLengthCheck();
    const introValidationResult = handleIntroLengthCheck();

    if (usernameValidationResult && accountnameValidationResult && introValidationResult) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
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
    try {
      let imageURL = "";

      // 파일의 길이가 0인 경우는 미지를 수정하지 않고 바로 저장한 경우에 해당합니다.
      // 따라서 이 경우에는 기존 정보를 image에 그대로 보내줍니다.
      if (imgRef.current.files.length === 0) {
        imageURL = myProfileData.user.image;
      }

      // 프로필 이미지를 수정한 경우, 수정한 데이터를 ImageFormData로 보내줍니다.
      imageURL = await ImageFormData(imgRef.current.files[0]);

      const res = await api.put(
        "/user",
        {
          user: {
            username: inputRef.current["username"].value,
            accountname: inputRef.current["accountname"].value,
            intro: inputRef.current["intro"].value,
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

      if (regex.test(inputRef.current["accountname"].value)) {
        alert("계정 ID에 한글은 입력이 불가능합니다.");
        return;
      }
      navigate(`/profile/${res.data.user.accountname}`, {
        state: { editAccountname: `${res.data.user.accountname}` },
      });
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
      <HeaderSave isActive={isActive} btnText="저장" onSubmitForm={handleEditProfile} />
      <main className="h-screen flex flex-col">
        <form action="" className="flex flex-col items-center">
          <fieldset>
            <legend className="ir">프로필 사진 업로드</legend>
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
            <legend className="ir">사용자 이름</legend>

            <label htmlFor="name" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              사용자 이름
            </label>
            <input
              required
              id="username"
              type="text"
              placeholder="2~10자 이내여야 합니다."
              ref={(el) => (inputRef.current["username"] = el)}
              className="xs:w-[26rem] sm:w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
              maxLength="10"
              minLength="2"
              defaultValue={myProfileData.user.username}
              onChange={(e) => {
                handleFormData(e);
                handleUsernameLengthCheck();
                handleBtnControl();
              }}
            />
          </fieldset>

          <fieldset className="mb-[2.5rem]">
            <legend className="ir">계정 ID</legend>
            <label htmlFor="userId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              계정 ID
            </label>
            <input
              id="accountname"
              type="text"
              placeholder="영문,숫자,특수문자(.),(_)만 사용 가능합니다."
              ref={(el) => (inputRef.current["accountname"] = el)}
              onChange={(e) => {
                handleFormData(e);
                handleAccountnameLengthCheck();
                handleBtnControl();
              }}
              defaultValue={myProfileData.user.accountname}
              pattern="[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]"
              className="xs:w-[26rem] sm:w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
            />
            {isWrong ? null : <p className="absolute font-normal text-[1.2rem] text-[#EB5757] mt-[0.6rem]">{errMsg}</p>}
          </fieldset>

          <fieldset>
            <legend className="ir">소개</legend>
            <label htmlFor="intro" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              소개
            </label>
            <input
              id="intro"
              type="text"
              placeholder="본인과 반려동물을 소개해주세요. (5글자 이상)"
              ref={(el) => (inputRef.current["intro"] = el)}
              onChange={(e) => {
                handleFormData(e);
                handleIntroLengthCheck();
                handleBtnControl();
              }}
              defaultValue={myProfileData.user.intro}
              className="xs:w-[26rem] sm:w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
            />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
