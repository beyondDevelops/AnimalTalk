const LoginBtn = ({ img, text, mt, border }) => {
  console.log(border);
  return (
    <button className={mt}>
      <li
        className={`min-w-[320px] min-h-[44px] leading-[44px] rounded-[44px] border-[${border}] border-[1px] bg-white text-center relative text-[#767676]`}
      >
        <img src={img} alt="" className="w-[18px] h-[18px] inline absolute left-[20px] top-[50%] translate-y-[-50%]" />
        {text}
      </li>
    </button>
  );
};

export default LoginBtn;
