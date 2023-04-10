import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import LoginHome from "./pages/LoginHome/LoginHome";
import LoginEmail from "./pages/LoginEmail/LoginEmail";
import SignUp from "./pages/SignUp/SignUp";
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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <SplashScreen />,
        },
        {
          path: "login",
          element: <LoginHome />,
          children: [
            {
              path: "email",
              element: <LoginEmail />,
            },
          ],
        },
        {
          path: "signup",
          element: <SignUp />,
          children: [
            {
              path: "profile",
              element: <SignupProfile />,
            },
          ],
        },
        {
          element: <CheckAuth />,
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "search",
              element: <UserSearch />,
            },
            {
              path: "profile/:accountname",
              element: <UserFeed />,
              children: [
                {
                  path: "followers",
                  element: <Follows />,
                },
                {
                  path: "followings",
                  element: <Follows />,
                },
                {
                  path: "clubupload",
                  element: <ClubUpload />,
                },
                {
                  path: "clubupload/:id",
                  element: <ClubUpload />,
                },
                {
                  path: "edit",
                  element: <EditProfile />,
                },
              ],
            },
            {
              path: "post/:id",
              element: <PostDetail />,
            },
            {
              path: "postedit",
              element: <PostUpload />,
            },
            {
              path: "postupload",
              element: <PostUpload />,
            },
            {
              path: "chat",
              element: <ChatList />,
              children: [
                {
                  path: ":accountname",
                  element: <ChatRoom />,
                },
              ],
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
