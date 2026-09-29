"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

export function BackToTop({ label = "До початку" }: { label?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 520);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "fixed bottom-5 right-5 z-30 grid h-12 w-12 cursor-pointer place-items-center rounded-md border border-primary/15 bg-primary text-white shadow-lg shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#041e4c] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 md:bottom-8 md:right-8",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="chevron-up" className="h-5 w-5" />
    </button>
  );
}
