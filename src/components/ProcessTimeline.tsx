"use client";

import { useEffect, useRef, useState } from "react";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

function TimelineCard({
  step,
  isLeft,
}: {
  step: ProcessStep;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        /* Layout: card sits on the correct half */
        "w-full md:w-[calc(50%-2.5rem)]",
        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8",
        /* Reveal transition */
        "transition-all duration-700 ease-out",
        visible
          ? "opacity-100 translate-x-0"
          : isLeft
          ? "opacity-0 -translate-x-12"
          : "opacity-0 translate-x-12",
      ].join(" ")}
    >
      <div
        className={[
          "bg-white rounded-2xl border border-neutral-200 shadow-card p-7",
          "hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200",
        ].join(" ")}
      >
        {/* Step label */}
        <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2 font-body">
          Step {step.step}
        </p>

        {/* Title */}
        <h4 className="text-lg font-semibold font-heading text-neutral-900 mb-2">
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-neutral-600 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* ── Vertical centre line ── */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--color-brand-400) 8%, var(--color-brand-400) 92%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Steps ── */}
      <div className="flex flex-col gap-12 md:gap-16">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={step.step} className="relative flex items-center">
              {/* Card */}
              <TimelineCard step={step} isLeft={isLeft} />

              {/* Centre node — number bubble */}
              <div
                className={[
                  "hidden md:flex absolute left-1/2 -translate-x-1/2 z-10",
                  "w-11 h-11 rounded-full bg-brand-700 text-white",
                  "items-center justify-center text-base font-semibold font-body",
                  "shadow-elevated ring-4 ring-surface-100",
                ].join(" ")}
                aria-hidden
              >
                {step.step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
