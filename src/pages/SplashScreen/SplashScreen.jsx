import React from "react";

const SplashScreen = () => {
  const splashImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;
  return (
    <main className="page">
      <div className="bg-cyan-300 basis-full overflow-hidden">
        <img
          src={splashImg}
          alt=""
          className="w-[145px] h-[200px] mt-64 mx-[auto]"
        />
      </div>
    </main>
  );
};

export default SplashScreen;
