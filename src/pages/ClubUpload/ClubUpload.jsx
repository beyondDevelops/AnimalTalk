import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { convertURLtoFile } from "../../api/Image/convertURLtoFile";
import Header from "../../shared/Header/Header";
import { moneyWithComma } from "../../utils/currentUnitComma";
import { useForm } from "react-hook-form";
import { createSingleImage } from "../../api/Image/createSingleImage";
import { createClub } from "../../api/Club/createClub";
import { updateClub } from "../../api/Club/updateClub";

const ClubUpload = () => {
  const imgUpload = `${process.env.PUBLIC_URL}/assets/img/img-button.png`;
  const imgUploadFin = `${process.env.PUBLIC_URL}/assets/img/icon-upload-file.png`;

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

  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.clubData;
  const { accountname } = useContext(AuthContext);

  useEffect(() => {
    setFocus("clubName");
  }, [setFocus]);

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

  // 모임 참가비 입력 시 콤마 자동 추가
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

  // 이미지 미리보기에 사용되기 위한 URL 생성
  useEffect(() => {
    const newImageURL = [];
    image.map((i) => newImageURL.push(URL.createObjectURL(i)));
    setImageURL(newImageURL);
  }, [image]);

  const onClubUpload = useCallback(
    async (data) => {
      const clubTextData = {
        itemName: data.clubName,
        price: parseInt(data.clubFee.replaceAll(",", "")),
        link: data.clubLocation,
      };
      const imageName = await createSingleImage(image);
      const submitData = {
        product: {
          ...clubTextData,
          itemImage: imageName,
        },
      };
      const res = await createClub(submitData);
      if (res) {
        navigate(`/profile/${accountname}`);
      }
    },
    [accountname, image, navigate]
  );

  const onClubUpEdit = useCallback(
    async (data) => {
      const clubTextData = {
        itemName: data.clubName,
        price: parseInt(data.clubFee.replaceAll(",", "")),
        link: data.clubLocation,
      };
      const imageName = await createSingleImage(image);
      const submitData = {
        product: {
          ...clubTextData,
          itemImage: imageName,
        },
      };
      const res = await updateClub(submitData, product.id);
      if (res) {
        navigate(`/profile/${accountname}`);
      }
    },
    [image, navigate]
  );

  return (
    <>
      <Header
        headerFor="save"
        btnText="저장"
        isActive={imageURL.length ? true : false}
        onSubmitForm={product ? handleSubmit(onClubUpEdit) : handleSubmit(onClubUpload)}
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
                required: "2~15자 이내여야 합니다.",
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
                required: {
                  value: true,
                  message: "참가비를 입력해주세요.",
                },
                pattern: /^[1-9][0-9]{0,2}(,[0-9]{3})*$/,
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
