import { useState, useEffect } from "react";
import { getFollowersFeeds } from "../api/axios";

export default function useFeeds(feedNum = 1) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getFollowersFeeds(feedNum, { signal })
      .then((data) => {
        setResults((prev) => [...prev, ...data]);
        setHasMore(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: err.message });
      });

    return () => controller.abort();
  }, [feedNum]);

  return { results, isLoading, isError, error, hasMore };
}
