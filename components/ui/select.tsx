"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/components/ui";

export type SelectOption = {
  value: string;
  label: string;
};

export function Select({
  value,
  options,
  onValueChange,
  className,
  placeholder = "Оберіть",
}: {
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-border bg-white px-4 text-left text-muted shadow-sm outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <Chevron className={cn("h-4 w-4 shrink-0 text-primary transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-14 z-30 overflow-hidden rounded-md border border-border bg-white p-1 shadow-xl" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-sm transition hover:bg-accent-soft",
                option.value === value && "bg-accent-soft font-semibold text-primary",
              )}
              onClick={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
              {option.value === value && <span className="text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Chevron({ className }: { className?: string }): ReactNode {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
