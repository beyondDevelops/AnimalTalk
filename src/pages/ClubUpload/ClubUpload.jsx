import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance, imgInstance } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { convertURLtoFile } from "../../api/Image/convertURLtoFile";
import Header from "../../shared/Header/Header";
import { moneyWithComma } from "../../utils/currentUnitComma";
import { useForm } from "react-hook-form";

const ClubUpload = () => {
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/img-button.png`;
  const imgUploadFin = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;

  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [uploadPossible, setUploadPossible] = useState(true);
  const [submitTextData, setSubmitTextData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    defaultValues: {
      clubName: "",
      clubFee: "",
      clubLocation: "",
    },
  });

  useEffect(() => {
    setFocus("clubName");
  }, [setFocus]);

  const onSubmitTextData = (data) => {
    const clubTextData = {
      itemName: data.clubName,
      price: moneyWithComma(data.clubFee),
      link: data.clubLocation,
    };
    setSubmitTextData(clubTextData);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.clubData;
  const { accountname } = useContext(AuthContext);

  // 모임을 수정하고자 하는 경우 - 모임 데이터 가져오기
  useEffect(() => {
    if (!product) return;

    const getImageFile = async () => {
      const imageFile = await convertURLtoFile(product.itemImage);
      setImage([imageFile]);
    };
    getImageFile();
    setValue("clubName", product.itemName);
    setValue("clubFee", moneyWithComma(product.price));
    setValue("clubLocation", product.link);
  }, [product, setValue]);

  const clubFeeValidation = (value) => {
    if (parseInt(value)) {
      const numberTypeValue = parseInt(value.match(/[0-9]/g).join(""));
      return moneyWithComma(numberTypeValue);
    }
    return "";
  };

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

  const imageFormData = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file[0]);

      const res = await imgInstance.post("/image/uploadfile", formData);
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

        const submitData = {
          product: {
            ...submitTextData,
            itemImage: imageName,
          },
        };

        const res = await instance.post("/product", JSON.stringify(submitData), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

        const submitData = {
          product: {
            ...submitTextData,
            itemImage: imageName,
          },
        };

        const res = await instance.put(`/product/${product.id}`, JSON.stringify(submitData), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <>
      <Header
        headerFor="save"
        btnText="저장"
        isActive={uploadPossible && !errors.clubName && !errors.clubFee && !errors.clubLocation && imageURL.length}
        onSubmitForm={handleSubmit(onSubmitTextData)}
      />
      <main>
        <form className="mt-[3rem] mx-[3.4rem]">
          <fieldset className="relative mb-[3rem]">
            <legend className="text-[1.2rem] text-cst-gray mb-[1.8rem]">이미지 등록</legend>

            <section className="xs:w-[100%] md:w-[32.2rem] h-[20.4rem] bg-[#F2F2F2] border-solid-[0.5rem] border-cst-light-gray rounded-[10px] mx-auto">
              <h2 className="ir">이미지 미리보기</h2>
              {!!imageURL.length ? (
                <img src={imageURL[0]} alt="" className="w-[32.2rem] h-[20.4rem] object-cover rounded-[10px]" />
              ) : (
                <></>
              )}
            </section>

            <label
              htmlFor="imgUpload"
              className="absolute inline-block w-[3.6rem] h-[3.6rem] bottom-0 right-0 mr-[1.2rem] mb-[1.2rem]"
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
              id="name"
              type="text"
              placeholder="모임명을 입력하여 주세요."
              className={`block xs:w-[100%] md:w-[32.2rem] py-[0.8rem] border-b-[0.1rem]  mb-[0.5rem] focus:outline-none ${
                !errors.clubName ? "border-b-m-color" : "border-b-cst-light-gray"
              }`}
              value={product?.itemName}
              {...register("clubName", {
                required: true,
                minLength: {
                  value: 2,
                  message: "2~15자 이내여야 합니다.",
                },
                maxLength: {
                  value: 15,
                  message: "2~15자 이내여야 합니다.",
                },
              })}
            />
            <span className="block text-[#ff5858] text-[1.2rem]">{errors?.clubName?.message}</span>

            <label htmlFor="price" className="text-[1.2rem] text-cst-gray font-medium">
              참가비
            </label>
            <input
              id="proce"
              type="text"
              placeholder="참가비를 입력하여 주세요."
              className={`block xs:w-[100%] md:w-[32.2rem] py-[0.8rem] border-b-[0.1rem]  mb-[0.5rem] focus:outline-none ${
                !errors.clubFee ? "border-b-m-color" : "border-b-cst-light-gray"
              }`}
              value={product?.price}
              {...register("clubFee", {
                required: true,
                pattern: {
                  value: /^[0-9]*$/,
                  message: "0부터 9까지의 숫자만 입력 가능합니다.",
                },
                validate: (value) => (value > 0 ? true : "0보다 큰 숫자를 입력해주세요."),
              })}
              onChange={(e) => setValue("clubFee", clubFeeValidation(e.target.value))}
            />
            <span className="block text-[#ff5858] text-[1.2rem]">{errors?.clubFee?.message}</span>

            <label htmlFor="text" className="text-[1.2rem] text-cst-gray font-medium">
              장소
            </label>
            <input
              id="text"
              type="text"
              placeholder="모임 장소를 입력하여 주세요."
              className={`block xs:w-[100%] md:w-[32.2rem] py-[0.8rem] border-b-[0.1rem]  mb-[0.5rem] focus:outline-none ${
                !errors.clubLocation ? "border-b-m-color" : "border-b-cst-light-gray"
              }`}
              value={product?.link}
              {...register("clubLocation", { required: "모임 장소를 입력하여 주세요." })}
            />
            <span className="block text-[#ff5858] text-[1.2rem]">{errors?.clubLocation?.message}</span>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default ClubUpload;
