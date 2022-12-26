import { HeaderFeed } from "../../shared/Header/HeaderFeed";
import Post from "../../shared/Post/Post";
import NoFeed from "../../components/NoFeed/NoFeed";
import Footer from "../../shared/Footer/Footer";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getFollowersFeeds = async () => {
      try {
        const res = await axios.get("/post/feed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err);
      }
    };

    getFollowersFeeds();
  }, []);

  return (
    <div className="page">
      <HeaderFeed />
      <main>{posts.length > 0 ? posts.map((post) => <Post key={post.id} post={post} />) : <NoFeed />}</main>
      <Footer />
    </div>
  );
};

export default Home;
