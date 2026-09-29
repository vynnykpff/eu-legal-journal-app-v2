"use client";

import { createContext, useContext, useId, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import type { ReactNode } from "react";
import { cn } from "@/components/ui";

type AccordionContextValue = {
  value: string | null;
  setValue: (value: string | null) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<{ value: string; isOpen: boolean; triggerId: string; contentId: string } | null>(null);

export function Accordion({
  children,
  defaultValue = null,
  className,
}: {
  children: ReactNode;
  defaultValue?: string | null;
  className?: string;
}) {
  const [value, setValue] = useState<string | null>(defaultValue);
  const context = useMemo(() => ({ value, setValue }), [value]);

  return (
    <AccordionContext.Provider value={context}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children, className, ...props }: ComponentProps<"div"> & { value: string; children: ReactNode }) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used inside Accordion");

  const id = useId();
  const itemContext = {
    value,
    isOpen: context.value === value,
    triggerId: `${id}-trigger`,
    contentId: `${id}-content`,
  };

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <div className={cn("overflow-hidden rounded-md border border-border bg-white", className)} {...props}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!context || !item) throw new Error("AccordionTrigger must be used inside AccordionItem");

  return (
    <button
      id={item.triggerId}
      type="button"
      aria-expanded={item.isOpen}
      aria-controls={item.contentId}
      className={cn("group flex w-full items-center justify-between text-left transition hover:bg-[#fbfcff]", className)}
      onClick={() => context.setValue(item.isOpen ? null : item.value)}
    >
      {children}
      <span className="ml-4 grid h-12 w-12 shrink-0 place-items-center self-center rounded-full border border-border bg-white text-primary transition group-hover:border-accent group-hover:bg-accent-soft" title={item.isOpen ? "Згорнути випуск" : "Розгорнути випуск"}>
        <svg className={cn("h-5 w-5 transition-transform duration-300 ease-out", item.isOpen && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </button>
  );
}

export function AccordionContent({ children, className }: { children: ReactNode; className?: string }) {
  const item = useContext(AccordionItemContext);
  if (!item) throw new Error("AccordionContent must be used inside AccordionItem");

  return (
    <div
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
        item.isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
