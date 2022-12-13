import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
/* 임시 import 입니다. */
import Chat from "./pages/Chat/Chat";
import PostCreate from "./pages/PostCreate/PostCreate";
import MyProfile from "./pages/MyProfile/MyProfile";

function App() {
  const [userInfo, setUserInfo] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!userInfo ? <Login /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path="/"
          element={
            !userInfo ? <Navigate to="/login" replace={true} /> : <Home />
          }
        />
        {/* path=/:user/chat 이런 식으로 들어가야 합니다. 현재는 테스트를 위해 user 정보를 제외했습니다. */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
