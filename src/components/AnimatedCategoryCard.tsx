"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "./ui/Button";
import type { ProductCategory } from "@/types";

interface AnimatedCategoryCardProps {
  category: ProductCategory;
  index: number;
}

export function AnimatedCategoryCard({ category, index }: AnimatedCategoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform w-full py-8 md:py-16 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Visuals */}
        <div className={`relative aspect-[4/3] w-full rounded-xl overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}>
          <Image 
            src={category.image} 
            alt={category.name} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain transition-transform duration-700 hover:scale-105" 
          />
        </div>
        
        {/* Content */}
        <div className={`flex flex-col justify-center ${isEven ? "md:order-2" : "md:order-1"}`}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4 uppercase tracking-tight">
            {category.name}
          </h3>
          <p className="text-sm md:text-base text-neutral-600 mb-8 leading-relaxed max-w-md">
            {category.longDescription || category.description}
          </p>
          <div className="flex">
            <ButtonLink 
              href={`/products/${category.id}`} 
              variant="outline"
              className="border-neutral-900 text-neutral-900 hover:bg-brand-800 hover:text-white mt-1 transition-colors"
            >
              Explore {category.name}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
