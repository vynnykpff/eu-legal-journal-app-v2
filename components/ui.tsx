import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LinkButton({
  href,
  children,
  className,
  variant = "primary",
}: ComponentProps<typeof Link> & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition",
        variant === "primary" && "bg-accent text-primary shadow-sm hover:-translate-y-0.5 hover:bg-[#e4ad00] hover:shadow-md active:translate-y-0",
        variant === "outline" && "border border-primary bg-white text-primary hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:shadow-sm active:translate-y-0",
        variant === "ghost" && "text-primary hover:bg-accent-soft hover:text-[#071d45]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ComponentProps<"a"> & { variant?: "primary" | "outline" | "ghost" }) {
  return (
    <a
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition",
        variant === "primary" && "bg-accent text-primary shadow-sm hover:-translate-y-0.5 hover:bg-[#e4ad00] hover:shadow-md active:translate-y-0",
        variant === "outline" && "border border-primary bg-white text-primary hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:shadow-sm active:translate-y-0",
        variant === "ghost" && "text-primary hover:bg-accent-soft hover:text-[#071d45]",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("card", className)} {...props} />;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-md border border-[#ead58b] bg-white px-3 py-1 text-xs font-semibold text-primary", className)}>
      {children}
    </span>
  );
}
