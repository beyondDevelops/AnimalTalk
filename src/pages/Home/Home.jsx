import { useState, useRef, useCallback } from "react";
import Header from "../../shared/Header/Header";
import Footer from "../../shared/Footer/Footer";
import Post from "../../shared/Post/Post";
import ErrorFeed from "../../components/ErrorFeed/ErrorFeed";
import NoFeed from "../../components/NoFeed/NoFeed";
import useFeeds from "../../hooks/useFeeds";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [pageNum, setPageNum] = useState(0);
  const { results, isLoading, isError, error, hasMore } = useFeeds(pageNum);
  const observerTarget = useRef(null);
  const lastFeedRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      observerTarget.current = new IntersectionObserver((feeds) => {
        if (feeds[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (post) observerTarget.current.observe(post);
    },
    [isLoading, hasMore]
  );

  if (isError) {
    return (
      <>
        <Header headerFor="feed" />
        <ErrorFeed errorMsg={error.message} />
        <Footer />
      </>
    );
  }

  const content =
    results.length === 0 ? (
      <NoFeed />
    ) : (
      results.map((post, idx) => {
        if (results.length === idx + 1) {
          return <Post key={post.id + uuidv4()} post={post} ref={lastFeedRef} />;
        } else {
          return <Post key={post.id + uuidv4()} post={post} />;
        }
      })
    );

  return (
    <>
      <Header headerFor="feed" />
      <main>{content}</main>
      <Footer />
    </>
  );
};

export default Home;
