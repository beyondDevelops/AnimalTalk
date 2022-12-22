// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// const LoginAndSignup = ({ name, btnName, option }) => {
//   const currentPageLocation = useLocation();
//   const navigate = useNavigate();

//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   /* 이메일, 비밀번호 타이핑할 때 바로 추적하면서 유효성 검사 */

//   /* 유효성 일치하지 않은 경우 빨간색으로 밑줄 및 안내 문구 작성 */

//   /* 이메일, 비밀번호가 유효성 통과시 로그인 버튼의 색깔을 진하게 만든다. */

//   /* 최초 렌더링 시 email input에 커서가 이동되게 설정 */
//   useEffect(() => {
//     emailRef.current.focus();
//   }, []);

//   const handleUserLoginSubmit = async (e) => {
//     /* 로그인 버튼을 누르면 https://mandarin.api.weniv.co.kr/user/login 에 post 메서드로 데이터 서버로 송신 */
//     /* 서버에서 응답코드 200 받으면 /home으로 이동 */
//     /* 그 이외의 서버 응답코드는 일치하지 않는 이메일, 비밀번호라고 안내 */
//     e.preventDefault();

//     try {
//       const res = await api.post(
//         "/user/login",
//         JSON.stringify({
//           user: {
//             email: emailRef.current.value,
//             password: passwordRef.current.value,
//           },
//         })
//       );
//       console.log(res);
//       if (res.status !== 200) throw new Error("서버로부터의 통신에 실패하였습니다.");
//       if (res.data.status) {
//         console.error(`${res.data.status}: ${res.data.message}`);
//         return;
//       }

//       const accessToken = res.data.user.token;
//       localStorage.setItem("token", accessToken);

//       navigate("/home");
//     } catch (err) {
//       console.log(err.status);
//       console.log(err.statement);
//     }
//   };

//   return (
//     <div className="page">
//       <main className="w-[39rem] h-screen mx-auto bg-white flex flex-col">
//         <h1 className="pt-[3rem] pb-[4rem] text-center text-[2.4rem] font-medium">{name}</h1>
//         <form action="" className="flex flex-col items-center " onSubmit={handleUserLoginSubmit}>
//           <fieldset className="mb-[1.6rem]">
//             <legend className="ir">로그인</legend>

//             <label htmlFor="emailId" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
//               이메일
//             </label>
//             <input
//               required
//               id="emailId"
//               type="email"
//               className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
//               ref={emailRef}
//               // onChange={}
//             />
//           </fieldset>

//           <fieldset>
//             <legend className="ir">로그인</legend>
//             <label htmlFor="pw" className="block text-[1.2rem] text-cst-gray py-[0.4rem]">
//               비밀번호
//             </label>
//             <input
//               required
//               id="pw"
//               type="password"
//               className="w-[32.2rem] border-b-[1px] py-[0.8rem] border-cst-light-gray outline-none"
//               ref={passwordRef}
//               // onChange={}
//             />
//           </fieldset>

//           <button className="btn-xl bg-s-color text-[#fff] mt-[3rem] mb-[2rem] text-center">{btnName}</button>
//         </form>
//         <Link to="/signup" className="text-cst-gray text-[1.2rem] text-center">
//           {option}
//         </Link>
//       </main>
//     </div>
//   );
// };

// export default LoginAndSignup;
