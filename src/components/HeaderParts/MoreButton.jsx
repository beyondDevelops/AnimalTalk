export const MoreButton = ({ onModalInfo }) => {
  const moreVertical = `${process.env.PUBLIC_URL}/assets/img/icon-more-vertical-large.png`;

  return (
    <button className="w-[2.4rem] h-[2.4rem] my-[1.2rem]" type="button" onClick={onModalInfo}>
      <img src={moreVertical} alt="더보기" />
    </button>
  );
};
