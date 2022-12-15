import React from "react";
import UserProfile from "../../share/UserProfile";
import { HeaderBasic } from "../../share/HeaderBind";
import Footer from "../../share/Footer";
import Post from "../../share/Post";
import Club from "../../share/Club";

const MyProfile = () => (
  <div className="bg-gray-100">
    <div className="page">
      <HeaderBasic />
      <main className="h-screen overflow-y-auto scrollbar-hide">
        <UserProfile />

        <Club />
        <Post />
      </main>
      <Footer />
    </div>
  </div>
);

export default MyProfile;
