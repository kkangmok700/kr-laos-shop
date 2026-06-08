"use client";
import { useStore } from "@/lib/store";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const locale = useStore((s) => s.locale);
  const setLocale = useStore((s) => s.setLocale);

  return (
    <button
      onClick={() => setLocale(locale === "ko" ? "lo" : "ko")}
      className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs font-medium hover:bg-accent"
      aria-label="Toggle language"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{locale === "ko" ? "한국어" : "ລາວ"}</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-muted-foreground">
        {locale === "ko" ? "ລາວ" : "한국어"}
      </span>
    </button>
  );
}
