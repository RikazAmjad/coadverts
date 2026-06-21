import { forwardRef, type ComponentPropsWithoutRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroup {
  groupLabel: string;
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

interface SelectProps extends Omit<ComponentPropsWithoutRef<"select">, "children"> {
  label: string;
  options: SelectItem[];
  error?: string;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, id, className = "", ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-neutral-900"
        >
          {label}
          {props.required && (
            <span className="text-error ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`w-full px-4 py-2.5 text-sm bg-neutral-white border rounded-md font-body transition-base appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 ${
              error
                ? "border-error text-error"
                : "border-neutral-300 text-neutral-900 hover:border-neutral-400"
            }`}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            {...props}
          >
            {options.map((item, index) => {
              if ("groupLabel" in item) {
                return (
                  <optgroup key={index} label={item.groupLabel}>
                    {item.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                );
              }
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-neutral-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={`${selectId}-error`}
            className="text-xs text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="text-xs text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export { Select };
export type { SelectOption };
