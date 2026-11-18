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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
      }
    );
    
    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform ${className} ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      }`}
    >
      {children}
    </div>
  );
}
