import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readMyFeed } from "../api/Feed/readMyFeed";

export default function useFeeds(pageNum = 0) {
  const { accountname } = useParams();
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
        const res = await readMyFeed(accountname, pageNum, { signal });
        setResults((prev) => [...prev, ...res]);
        setHasMore(Boolean(res.length));
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
  }, [pageNum, accountname]);

  return { results, isLoading, isError, error, hasMore };
}
