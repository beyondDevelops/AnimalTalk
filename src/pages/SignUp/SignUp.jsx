import React from "react";
import LoginAndJoin from "../../components/LoginAndJoin/LoginAndJoin";

const SignUp = ({ name, btnName }) => {
  return (
    <div>
      <LoginAndJoin name={name} btnName={btnName} />
    </div>
  );
};

export default SignUp;
