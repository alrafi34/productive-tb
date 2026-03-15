"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function LazyLoad({ 
  children, 
  fallback, 
  rootMargin = "200px" 
}: { 
  children: ReactNode; 
  fallback?: ReactNode; 
  rootMargin?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{isVisible ? children : fallback}</div>;
}
