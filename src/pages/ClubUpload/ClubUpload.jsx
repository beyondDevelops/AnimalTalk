import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { axiosImgUpload } from "../../api/axios";
import { UserContext } from "../../context/UserContext";
import { HeaderSave } from "../../shared/Header/HeaderSave";

const ClubUpload = () => {
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/img-button.png`;
  const imgUploadFin = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;

  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [uploadPossible, setUploadPossible] = useState(true);

  const [isClubName, setIsClubName] = useState(false);
  const [isClubPrice, setIsClubPrice] = useState(false);
  const [isClubLocation, setIsClubLocation] = useState(false);

  const clubName = useRef();
  const clubPrice = useRef();
  const clubLocation = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.clubData;
  const { accountname } = useContext(UserContext);

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

  useEffect(() => {
    if (!product) return;

    const getImageFile = async () => {
      const imageFile = await convertURLtoFile(product.itemImage);
      setImage([imageFile]);
    };
    getImageFile();
    clubName.current.value = product.itemName;
    clubPrice.current.value = product.price;
    clubLocation.current.value = product.link;
    setIsClubName(true);
    setIsClubPrice(true);
    setIsClubLocation(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이미지 업로드
  const handleImgUpload = (e) => {
    const maxSize = 10 * 1024 * 1024;

    if (e.target.files.size > maxSize) {
      alert("이미지 크기는 10MB를 초과할 수 없습니다.");
      return;
    }
    setImage([...e.target.files]);
  };

  useEffect(() => {
    const newImageURL = [];
    image.map((i) => newImageURL.push(URL.createObjectURL(i)));
    setImageURL(newImageURL);
  }, [image]);

  // 모임명
  const handleClubName = (e) => {
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setIsClubName(false);
    } else {
      setIsClubName(true);
    }
  };

  const toInteger = (string) => {
    return parseInt(string.match(/[0-9]/g).join(""));
  };

  const comma = (money) => {
    return money
      .toString()
      .split("")
      .reverse("")
      .map((val, idx) => (idx % 3 === 0 && idx !== 0 ? val + "," : val))
      .reverse()
      .join("");
  };

  const handleClubPrice = (e) => {
    try {
      e.target.value = comma(toInteger(e.target.value));
      setIsClubPrice(true);
    } catch {
      e.target.value = "";
      setIsClubPrice(false);
    }
  };

  const handleClubLocation = (e) => {
    e.target.value ? setIsClubLocation(true) : setIsClubLocation(false);
  };

  const imageFormData = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file[0]);

      const res = await axiosImgUpload.post("/image/uploadfile", formData);
      if (res.status !== 200) {
        throw new Error(res.status, "통신에 실패했습니다.");
      }
      return res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };

  const onClubUpload = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setUploadPossible(false);

        const token = localStorage.getItem("token");
        const imageName = await imageFormData(image);

        const res = await axios.post(
          "/product",
          {
            product: {
              itemName: clubName.current.value,
              price: toInteger(clubPrice.current.value),
              link: clubLocation.current.value,
              itemImage: imageName,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          setUploadPossible(true);
          throw new Error(res.status, "통신에 실패했습니다.");
        }

        navigate(`/profile/${accountname}`);
      } catch (err) {
        console.log(err);
      }
    },
    [accountname, image, navigate]
  );

  const onClubUpEdit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setUploadPossible(false);

        const token = localStorage.getItem("token");
        const imageName = await imageFormData(image);

        const res = await axios.put(
          `/product/${product.id}`,
          {
            product: {
              itemName: clubName.current.value,
              price: toInteger(clubPrice.current.value),
              link: clubLocation.current.value,
              itemImage: imageName,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 200) {
          setUploadPossible(true);
          throw new Error(res.status, "통신에 실패했습니다.");
        }

        navigate(`/profile/${accountname}`);
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [image, navigate]
  );

  return (
    <div className="page">
      <HeaderSave
        btnText="저장"
        isActive={uploadPossible && isClubName && isClubLocation && isClubPrice && imageURL.length}
        onSubmitForm={product ? onClubUpEdit : onClubUpload}
      />
      <main>
        <form className="mt-[3rem] mx-[3.4rem]">
          <fieldset className="relative mb-[3rem]">
            <legend className="text-[1.2rem] text-cst-gray mb-[1.8rem]">이미지 등록</legend>

            <section className="w-[32.2rem] h-[20.4rem] bg-[#F2F2F2] border-solid-[0.5rem] border-cst-light-gray rounded-[10px]">
              <h2 className="ir">이미지 미리보기</h2>
              {!!imageURL.length ? (
                <img src={imageURL[0]} alt="" className="w-[32.2rem] h-[20.4rem] object-cover rounded-[10px]" />
              ) : (
                <></>
              )}
            </section>

            <label
              htmlFor="imgUpload"
              className="absolute block w-[3.6rem] h-[3.6rem] bottom-0 right-0 mr-[1.2rem] mb-[1.2rem]"
            >
              <img
                src={imageURL.length ? imgUploadFin : imgUpload}
                alt=""
                className="w-[3.6rem] h-[3.6rem] cursor-pointer"
              />
            </label>
            <input id="imgUpload" accept="image/*" type="file" className="hidden" onChange={handleImgUpload} />
          </fieldset>

          <fieldset>
            <legend className="ir">상세 내용</legend>

            <label htmlFor="name" className="text-[1.2rem] text-cst-gray font-medium">
              모임명
            </label>
            <input
              ref={clubName}
              id="name"
              type="text"
              className={`block w-[32.2rem] py-[0.8rem] border-b-[0.1rem]  mb-[1.6rem] focus:outline-none ${
                isClubName ? "border-b-m-color" : "border-b-cst-light-gray"
              }`}
              placeholder="2~5자 이내여야 합니다."
              onChange={handleClubName}
              minLength="2"
              maxLength="5"
            />

            <label htmlFor="price" className="text-[1.2rem] text-cst-gray font-medium">
              참가비
            </label>
            <input
              ref={clubPrice}
              id="proce"
              type="text"
              className={`block w-[32.2rem] py-[0.8rem] border-b-[0.1rem]  mb-[1.6rem] focus:outline-none ${
                isClubPrice ? "border-b-m-color" : "border-b-cst-light-gray"
              }`}
              placeholder="숫자만 입력 가능합니다."
              onChange={handleClubPrice}
            />

            <label htmlFor="text" className="text-[1.2rem] text-cst-gray font-medium">
              장소
            </label>
            <input
              ref={clubLocation}
              id="text"
              type="text"
              className={`block w-[32.2rem] py-[0.8rem] border-b-[0.1rem]  mb-[1.6rem] focus:outline-none ${
                isClubLocation ? "border-b-m-color" : "border-b-cst-light-gray"
              }`}
              placeholder="장소를 입력해주세요."
              onChange={handleClubLocation}
            />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default ClubUpload;
