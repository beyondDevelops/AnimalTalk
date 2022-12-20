import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
/* 임시 import 입니다. */
import Chat from "./pages/Chat/Chat";
import PostCreate from "./pages/PostCreate/PostCreate";
import MyProfile from "./pages/MyProfile/MyProfile";
import OtherProfile from "./pages/OtherProfile/OtherProfile";
import LoginEmail from "./pages/LoginEmail/LoginEmail";
import SignUp from "./pages/SignUp/SignUp";
import Profilesetting from "./share/ProfileSetting";

function App() {
  const [userInfo, setUserInfo] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!userInfo ? <Login /> : <Navigate to="/" replace={true} />} />
        <Route path="/" element={!userInfo ? <Navigate to="/login" replace={true} /> : <Home />} />
        {/* path=/:user/chat 이런 식으로 들어가야 합니다. 현재는 테스트를 위해 user 정보를 제외했습니다. */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/otherprofile" element={<OtherProfile />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/login/email" element={<LoginEmail name="로그인" btnName="로그인" option="이메일로 회원가입" />} />
        <Route path="/join" element={<SignUp name="회원가입" btnName="회원가입" />} />
        <Route
          path="/setting"
          element={
            <Profilesetting name="프로필 설정" btnName="애니멀톡 시작하기" text="언제든지 변경할 수 있습니다." />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
