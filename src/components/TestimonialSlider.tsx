"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import { ReferenceBlock } from "@/types";

interface TestimonialSliderProps {
  references: ReferenceBlock[];
}

export function TestimonialSlider({ references }: TestimonialSliderProps) {
  const [active, setActive] = useState(0);
  const isPaused = useRef(false);

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + references.length) % references.length), [references.length]);

  const next = useCallback(() =>
    setActive((i) => (i + 1) % references.length), [references.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setActive((i) => (i + 1) % references.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [references.length]);

  const current = references[active];

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* ── Left panel ── */}
      <div>
        <p className="text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3 font-body">
          Trusted by Leading Brands
        </p>
        <h2 className="text-balance leading-tight">
          Premium Packaging for Europe&apos;s Best
        </h2>
        <p className="mt-4 text-neutral-600 leading-relaxed max-w-sm">
          From Nordic publishers to premium fashion houses, brands trust CoAdvert
          for custom branded bags, quality packaging, and on time delivery.
        </p>

        {/* Dot indicators */}
        {/* <div className="mt-10 flex items-center gap-2">
          {references.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="transition-all duration-300 rounded-full focus-visible:outline-none"
              style={{
                width: i === active ? 28 : 10,
                height: 10,
                background: i === active
                  ? "var(--color-brand-700)"
                  : "var(--color-neutral-300)",
              }}
            />
          ))}
        </div> */}

        {/* Prev / Next arrows */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-brand-700 hover:text-brand-700 hover:bg-brand-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-brand-700 hover:text-brand-700 hover:bg-brand-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-xs text-neutral-400 font-body ml-1">
            {active + 1} / {references.length}
          </span>
        </div>
      </div>

      {/* ── Right panel — card stack ── */}
      <div className="relative flex justify-center lg:justify-end">
        {/* Ghost card behind (next slide preview) */}
        <div
          className="absolute top-4 right-4 w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-card"
          style={{ height: 220, opacity: 0.45, transform: "scale(0.97)" }}
          aria-hidden
        />

        {/* Active card */}
        <div
          key={active}
          className="relative w-full max-w-md rounded-2xl bg-white border border-neutral-200 shadow-elevated p-8 transition-all"
          style={{ animation: "slideInCard 0.35s cubic-bezier(0.4,0,0.2,1)" }}
        >
          {/* Large decorative quote mark */}
          <div
            className="text-7xl leading-none font-heading text-brand-100 select-none mb-2"
            aria-hidden
          >
            "
          </div>

          {/* Quote / note */}
          <p className="text-neutral-700 text-base leading-relaxed">
            &quot;{current.testimonial || current.note}&quot;
          </p>

          {/* Divider */}
          <div className="my-6 h-px bg-neutral-100" />

          {/* Client identity */}
          <div className="flex items-center gap-4">
            {current.logo ? (
              <div
                className={`w-12 h-12 rounded-xl p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-xs border ${
                  current.id === "kpmg" || current.logo.toLowerCase().includes("white")
                    ? "bg-neutral-900 border-neutral-800"
                    : "bg-surface-100 border-neutral-200"
                }`}
              >
                <Image
                  src={current.logo}
                  alt={`${current.clientName} logo`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-base"
                style={{
                  backgroundColor: `hsl(${current.clientName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 55%, 45%)`,
                }}
              >
                {current.clientName
                  .split(/[\s\-\/]+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0].toUpperCase())
                  .join('')}
              </div>
            )}
            <div>
              <p className="font-semibold text-neutral-900 font-heading text-sm">
                {current.clientName}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {current.industry} &bull; {current.region}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
