export default function Loading() {
  const loadingImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;

  return (
    <div className="my-auto">
      <img src={loadingImg} alt="노트북을 들고 있는 고양이" className="mx-[auto] mt-[25%] mb-[3rem]" />
      <p className="text-[1.6rem] text-center text-m-color">Loading ...</p>
    </div>
  );
}
