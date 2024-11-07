import { useRef, useCallback, useEffect } from "react";

export const useInfiniteScroll = <T extends HTMLElement>(
  callback: () => void,
  options?: { enabled: boolean },
): React.MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && options?.enabled) {
        callback();
      }
    },
    [callback, options?.enabled],
  );

  useEffect(() => {
    const target = ref.current;

    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleObserver]);

  return ref;
};
