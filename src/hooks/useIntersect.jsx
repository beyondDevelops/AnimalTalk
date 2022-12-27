import { useEffect } from "react";

export default function useInterset(targetRef, stateCount, stateMore, requestAPIFunc) {
  useEffect(() => {
    if (!targetRef.current || !stateMore) return;

    const observerCallback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        requestAPIFunc();
      }
    };

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [stateCount, stateMore]);
}
