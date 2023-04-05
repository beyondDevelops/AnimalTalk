const ErrorFeed = ({ errerMsg }) => {
  const defaultImg = `${process.env.PUBLIC_URL}/assets/img/char-default-cat.svg`;

  return (
    <main>
      <section className="h-full my-auto flex flex-col justify-center items-center">
        <h2 className="ir">요청하신 정보를 불러오지 못했습니다.</h2>
        <img src={defaultImg} alt="잠시후 다시 접속하여 주세요." className="w-[14.5rem] h-[20rem] align-bottom" />
        <h3 className="text-cst-gray font-bold text-[2.4rem]">Oops!</h3>
        <p className="text-cst-gray text-[1.4rem]">{errerMsg || "잠시후 다시 시도하여 주세요 ㅠㅠ"}</p>
      </section>
    </main>
  );
};

export default ErrorFeed;
