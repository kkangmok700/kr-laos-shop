import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKRW(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLAK(amount: number) {
  return new Intl.NumberFormat("lo-LA", {
    style: "currency",
    currency: "LAK",
    maximumFractionDigits: 0,
  }).format(amount);
}

const KRW_TO_LAK = 16.5;

export function formatPrice(amountKRW: number, locale: "ko" | "lo") {
  if (locale === "lo") {
    return formatLAK(Math.round(amountKRW * KRW_TO_LAK));
  }
  return formatKRW(amountKRW);
}
