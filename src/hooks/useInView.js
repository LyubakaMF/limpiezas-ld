import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isInView] — isInView becomes true once the element enters the viewport.
 * The element stays mounted after entering (once: true behaviour).
 */
export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView];
}