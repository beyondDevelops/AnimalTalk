import React from "react";

const SplashScreen = () => {
  const splashImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;
  return (
    <main className="page">
      <div className="basis-full overflow-hidden">
        <img src={splashImg} alt="" className="w-[14.5rem] h-[20rem] mt-64 mx-[auto]" />
      </div>
    </main>
  );
};

export default SplashScreen;
