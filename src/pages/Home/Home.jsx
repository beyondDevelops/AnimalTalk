import { Header } from "../../shared/Header/Header";
import Post from "../../shared/Post/Post";
import NoFeed from "../../components/NoFeed/NoFeed";
import Footer from "../../shared/Footer/Footer";
import axios from "../../api/axios";
import { useState, useRef, useEffect } from "react";
import useIntersect from "../../hooks/useIntersect";

const Home = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState({ postNum: 0, moreFeed: true });

  const getFollowersFeeds = async () => {
    try {
      const res = await axios.get(`/post/feed?limit=10&skip=${state.postNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prev) => [...prev, ...res.data.posts]);
      setState((prev) => ({ postNum: prev.postNum + 10, moreFeed: posts.length % 10 === 0 }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      getFollowersFeeds();
    }
  }, []);

  const observerTarget = useRef(null);

  useIntersect(observerTarget, state.postNum, state.moreFeed, getFollowersFeeds);

  return (
    <>
      <Header headerFor="feed" />
      <main>
        <>
          {posts.length > 0 ? posts.map((post) => <Post key={post.id} post={post} />) : <NoFeed />}
          {posts.length > 0 && <div ref={observerTarget}></div>}
        </>
      </main>
      <Footer />
    </>
  );
};

export default Home;
