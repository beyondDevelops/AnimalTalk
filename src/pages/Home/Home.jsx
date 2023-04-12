import { useRef, useCallback } from "react";
import Header from "../../shared/Header/Header";
import Footer from "../../shared/Footer/Footer";
import Post from "../../shared/Post/Post";
import ErrorFeed from "../../components/ErrorFeed/ErrorFeed";
import NoFeed from "../../components/NoFeed/NoFeed";
import { v4 as uuidv4 } from "uuid";
import { useInfiniteQuery } from "react-query";
import { readFollowingFeed } from "../../api/Feed/readFollowingFeed";

const Home = () => {
  const { data, status, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["post"],
    ({ pageParam = 0 }) => readFollowingFeed(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    }
  );
  const observerTarget = useRef(null);
  const lastFeedRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;
      if (observerTarget.current) observerTarget.current.disconnect();
      observerTarget.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (post) observerTarget.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error") {
    return (
      <>
        <Header headerFor="feed" />
        <ErrorFeed errorMsg={error.message} />
        <Footer />
      </>
    );
  }

  const content =
    data?.pages.length === 0 ? (
      <NoFeed />
    ) : (
      data?.pages.map((page) => {
        return page?.map((post, idx) => {
          if (page.length === idx + 1) {
            return <Post key={post.id + uuidv4()} post={post} ref={lastFeedRef} />;
          }
          return <Post key={post.id + uuidv4()} post={post} />;
        });
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
