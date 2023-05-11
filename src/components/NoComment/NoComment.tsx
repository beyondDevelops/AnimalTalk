export default function NoComment() {
  const defaultImg = `${process.env.PUBLIC_URL}/assets/img/char-loading-cat.svg`;
  return (
    <>
      <img
        src={defaultImg}
        alt="노트북을 보는 노란 고양이 애니몰톡 로고입니다."
        className="inline-block w-[4rem] h-[4rem]"
      />
      <p className="inline-block w-[26rem] ml-[0.5rem] text-cst-gray whitespace-nowrap overflow-ellipsis overflow-hidden align-middle">
        입력된 댓글이 없다냥...
      </p>
    </>
  );
}
