import { HeaderFeed } from "../../shared/Header/HeaderFeed";
import Post from "../../shared/Post/Post";
import NoFeed from "../../components/NoFeed/NoFeed";
import Footer from "../../shared/Footer/Footer";
import axios from "../../api/axios";
import { useEffect, useState, useRef } from "react";
import useInterset from "../../hooks/useIntersect";

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

  const observerTarget = useRef(null);

  useInterset(observerTarget, state.postNum, state.moreFeed, getFollowersFeeds);

  return (
    <div className="page">
      <HeaderFeed />
      <main>
        <>
          {posts.length > 0 ? posts.map((post) => <Post key={post.id} post={post} />) : <NoFeed />}
          <div ref={observerTarget}></div>
        </>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
