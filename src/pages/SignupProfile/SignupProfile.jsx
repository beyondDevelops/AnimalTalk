import React from "react";
import ProfileSetting from "../../shared/Profile/ProfileSetting";

const SignupProfile = () => {
  return (
    <>
      <ProfileSetting name="프로필 설정" btnName="애니멀톡 시작하기" text="언제든지 변경할 수 있습니다." isBtn={true} />
    </>
  );
};

export default SignupProfile;
