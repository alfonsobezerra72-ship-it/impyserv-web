import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceBs(price: number) {
  return `Bs. ${price.toLocaleString("es-BO", { maximumFractionDigits: 0 })}`;
}
