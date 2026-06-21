"use client";

import { useState, useRef, useEffect } from "react";
import type { SelectItem } from "./Select";

interface MultiSelectProps {
  label: string;
  options: SelectItem[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select products...",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten options to map values to labels for rendering chips
  const flatOptions = options.flatMap((item) =>
    "groupLabel" in item ? item.options : [item]
  );

  const getLabel = (val: string) =>
    flatOptions.find((o) => o.value === val)?.label || val;

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const removeOption = (e: React.MouseEvent, optValue: string) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optValue));
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label className="text-sm font-medium text-neutral-900">{label}</label>
      
      <div className="relative w-full">
        <div
          className={`relative min-h-[44px] w-full px-2 py-1.5 bg-neutral-white border rounded-md font-body transition-base cursor-pointer focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-600 ${
            error ? "border-error" : "border-neutral-300 hover:border-neutral-400"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1.5 items-center pr-8">
            {value.length === 0 ? (
              <span className="text-neutral-400 text-sm px-2 py-1">
                {placeholder}
              </span>
            ) : (
              value.map((val) => (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200"
                >
                  {getLabel(val)}
                  <button
                    type="button"
                    onClick={(e) => removeOption(e, val)}
                    className="hover:bg-brand-200 rounded-full p-0.5 transition-colors focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <svg
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 7l5 5 5-5"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 max-h-64 overflow-y-auto bg-white border border-neutral-200 rounded-md shadow-lg py-1">
            {options.map((item, index) => {
              if ("groupLabel" in item) {
                return (
                  <div key={index}>
                    <div className="px-3 py-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50 sticky top-0 z-10">
                      {item.groupLabel}
                    </div>
                    {item.options.map((opt) => {
                      if (!opt.value) return null; // skip empty generic options if any
                      return (
                        <label
                          key={opt.value}
                          className="flex items-center px-4 py-2 hover:bg-brand-50 cursor-pointer text-sm text-neutral-800 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={value.includes(opt.value)}
                            onChange={() => toggleOption(opt.value)}
                            className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500 mr-3 cursor-pointer"
                          />
                          <span className="cursor-pointer">{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                );
              }
              if (!item.value) return null;
              return (
                <label
                  key={item.value}
                  className="flex items-center px-4 py-2 hover:bg-brand-50 cursor-pointer text-sm text-neutral-800 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(item.value)}
                    onChange={() => toggleOption(item.value)}
                    className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500 mr-3 cursor-pointer"
                  />
                  <span className="cursor-pointer">{item.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
