"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  // Both the server and the pre-hydration client render must agree on this
  // initial value, so it can't depend on `typeof IntersectionObserver` (that
  // check is always true in Node during SSR). Next.js 16's minimum browser
  // support (Chrome/Edge 111+, Firefox 111+, Safari 16.4+) all ship the API
  // natively, so no no-JS/unsupported-browser fallback is needed.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
