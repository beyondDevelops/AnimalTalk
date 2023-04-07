import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFollowersFeeds, getPageOwnerFeeds } from "../api/axios";

export default function useFeeds(pageNum = 1) {
  const { accountname } = useParams();
  const token = localStorage.getItem("token");
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

    const getFeeds = async () => {
      try {
        const res = accountname
          ? await getPageOwnerFeeds(accountname, pageNum, token, { signal })
          : await getFollowersFeeds(pageNum, token, { signal });
        setResults((prev) => [...prev, ...res]);
        setHasMore(!Boolean(res.length % 10));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: err.message });
      }
    };

    getFeeds();

    return () => controller.abort();
  }, [pageNum]);

  return { results, isLoading, isError, error, hasMore };
}
