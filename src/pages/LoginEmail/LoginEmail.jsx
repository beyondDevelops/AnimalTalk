import React from "react";
import LoginAndJoin from "../../components/LoginAndJoin/LoginAndJoin";

const LoginEmail = ({ name, btnName, option }) => {
  return (
    <>
      <LoginAndJoin name={name} btnName={btnName} option={option} />
    </>
  );
};

export default LoginEmail;
