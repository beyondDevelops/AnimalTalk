import { useRef, useState, useEffect } from "react";
import api, { axiosImgUpload } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";

const SignupProfile = () => {
  const baseProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;
  const upload = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;

  const navigate = useNavigate();

  const location = useLocation();
  const { email, password } = location.state;

  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current["username"].focus();
  }, []);

  const [profileImage, setProfileImage] = useState(false);
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

  const convertURLtoFile = async (url) => {
    const res = await axios({
      url,
      method: "get",
      responseType: "blob",
    });
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([res.data], filename, metadata);
  };

  // 이미지를 파일로 변경하여 서버로 전송
  const ImageFormData = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axiosImgUpload.post("/image/uploadfile", formData);
      if (res.status !== 200) {
        throw new Error(res.status, "통신에 실패했습니다.");
      }

      return "https://mandarin.api.weniv.co.kr/" + res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입시 바로 로그인이 될 수 있게
  const loginControl = async () => {
    try {
      const res = await api.post(
        "/user/login",
        JSON.stringify({
          user: {
            email,
            password,
          },
        })
      );

      if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");

      const accessToken = res.data.user.token;
      localStorage.setItem("token", accessToken);
    } catch (err) {
      console.error(err);
    }
  };

  // 프로필 설정
  const handleProfileSetting = async (e) => {
    e.preventDefault();

    try {
      const defaultImg = await convertURLtoFile("https://mandarin.api.weniv.co.kr/1672734242192.png");
      const imageURL = await ImageFormData(inputRef.current["image"].files[0] || defaultImg);

      const res = await api.post(
        "/user",
        JSON.stringify({
          user: {
            username: inputRef.current["username"].value,
            email,
            password,
            accountname: inputRef.current["accountname"].value,
            intro: inputRef.current["intro"].value,
            image: imageURL,
          },
        })
      );
      if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");

      if (res.data.message === "회원가입 성공") {
        await loginControl();
        navigate("/home");
      }
    } catch (err) {
      if (err.response.data.message === "이미 사용중인 계정 ID입니다.") {
        setIsWrong(false);
        setErrMsg("이미 사용중인 계정 ID입니다.");
      } else if (err.response.data.message === "영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.") {
        setIsWrong(false);
        setErrMsg("영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.");
      } else if (err.response.data.message === "필수 입력사항을 입력해주세요.") {
        alert("비정상적 접근입니다.");
      }
      console.log(err.response.data.message);
    }
  };

  // 이미지 미리보기
  const imgPreview = () => {
    const uploadFile = inputRef.current["image"].files[0] || baseProfile;
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
    };
  };

  return (
    <div className="page">
      <main className="h-screen flex flex-col">
        <strong className="pt-[3rem] pb-[1.2rem] text-center text-[2.4rem] font-medium">프로필 설정</strong>
        <p className="text-center text-cst-gray">언제든지 변경이 가능합니다.</p>
        <form action="" className="flex flex-col items-center">
          <fieldset>
            <legend className="ir">프로필 사진 업로드</legend>
            <label htmlFor="imgUpload" className="block relative my-[3rem] cursor-pointer">
              <img
                src={profileImage ? profileImage : baseProfile}
                alt="프로필 이미지 업로드"
                className="w-[11rem] h-[11rem] rounded-full object-cover"
              />
              <img src={upload} alt="" className="w-[3.6rem] h-[3.6rem] absolute right-0 bottom-0" />
            </label>
            <input
              ref={(el) => (inputRef.current["image"] = el)}
              id="imgUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={imgPreview}
            />
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
              ref={(el) => (inputRef.current["username"] = el)}
              placeholder="2~10자 이내여야 합니다."
              onChange={(e) => {
                handleFormData(e);
                handleUsernameLengthCheck();
                handleBtnControl();
              }}
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
            />
          </fieldset>

          <fieldset className="mb-[2.5rem]">
            <legend className="ir">계정 ID</legend>
            <label htmlFor="userId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
              계정 ID
            </label>
            <input
              required
              id="accountname"
              type="text"
              ref={(el) => (inputRef.current["accountname"] = el)}
              placeholder="영문,숫자,특수문자(.),(_)만 사용 가능합니다."
              onChange={(e) => {
                handleFormData(e);
                handleAccountnameLengthCheck();
                handleBtnControl();
              }}
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
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
              ref={(el) => (inputRef.current["intro"] = el)}
              placeholder="본인과 반려동물을 소개해주세요. (5글자 이상)"
              onChange={(e) => {
                handleFormData(e);
                handleIntroLengthCheck();
                handleBtnControl();
              }}
              className="w-[32.2rem] border-b-[1px] border-cst-light-gray py-[0.8rem] outline-m-color"
            />
          </fieldset>

          <button
            onClick={handleProfileSetting}
            className={`${
              isActive ? "btn-on" : "pointer-events-none btn-off"
            } btn-xl text-[#fff] mt-[3rem] mb-[2rem] text-center`}
          >
            애니멀톡 시작하기
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignupProfile;
