import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  primary: "bg-secondary text-primary hover:bg-secondary/90",
  outline: "border border-white text-white hover:bg-white/10",
  dark: "bg-primary text-white hover:bg-primary-accent",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors text-sm sm:text-base";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: keyof typeof variants;
};

export function LinkButton({ variant = "primary", className, ...props }: LinkButtonProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
