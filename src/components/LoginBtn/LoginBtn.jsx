const LoginBtn = ({ mt, img, text, borderColor }) => {
  return (
    <li className={mt}>
      <button
        className={`mb-[10px] rounded-[44px] min-w-[320px] min-h-[44px] leading-[44px] ${borderColor} border-[1px] bg-white text-center relative text-[#767676]`}
      >
        <img src={img} alt="" className="w-[18px] h-[18px] inline absolute left-[20px] top-[50%] translate-y-[-50%]" />
        {text}
      </button>
    </li>
  );
};

export default LoginBtn;
