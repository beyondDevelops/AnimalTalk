import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import LoginHome from "./pages/LoginHome/LoginHome";
import LoginEmail from "./pages/LoginEmail/LoginEmail";
import Signup from "./pages/SignUp/SignUp";
import SignupProfile from "./pages/SignupProfile/SignupProfile";
import CheckAuth from "./components/CheckAuth/CheckAuth";
import Home from "./pages/Home/Home";
import UserSearch from "./pages/UserSearch/UserSearch";
import UserFeed from "./pages/UserFeed/UserFeed";
import Follows from "./pages/Follows/Follows";
import ClubUpload from "./pages/ClubUpload/ClubUpload";
import EditProfile from "./pages/EditProfile/EditProfile";
import PostDetail from "./pages/PostDetail/PostDetail";
import PostUpload from "./pages/PostUpload/PostUpload";
import ChatList from "./pages/ChatList/ChatList";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login">
          <Route index element={<LoginHome />} />
          <Route path="email" element={<LoginEmail />} />
        </Route>

        <Route path="/signup">
          <Route index element={<Signup />} />
          <Route path="profile" element={<SignupProfile />} />
        </Route>

        <Route element={<CheckAuth />}>
          <Route path="/home" element={<Home />} />

          <Route path="/search" element={<UserSearch />} />

          <Route path="/profile/:accountname">
            <Route index element={<UserFeed />} />
            <Route path="followers" element={<Follows />} />
            <Route path="followings" element={<Follows />} />
            <Route path="clubupload" element={<ClubUpload />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>

          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/postedit" element={<PostUpload />} />
          <Route path="/postupload" element={<PostUpload />} />

          <Route path="/chat">
            <Route index element={<ChatList />} />
            <Route path=":accountname" element={<ChatRoom />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
