"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedFadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedFadeIn({ children, delay = 0, className = "" }: AnimatedFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: unobserve after showing if we only want it to animate once
          // if (ref.current) observer.unobserve(ref.current);
        } else {
          // If you want it to hide when scrolling away, uncomment the next line
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform ${className} ${
        !hasRendered ? "opacity-0 translate-y-12" :
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
      }`}
    >
      {children}
    </div>
  );
}
