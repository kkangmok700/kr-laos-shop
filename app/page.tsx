"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Sparkles, Truck, ShieldCheck, ChevronRight } from "lucide-react";

const categoryIcons: Record<string, string> = {
  skincare: "🧴",
  makeup: "💄",
  mask: "✨",
  perfume: "🌸",
  haircare: "💇",
  bodycare: "🧼",
};

export default function HomePage() {
  const locale = useStore((s) => s.locale);
  const t = dict[locale];
  const best = products.filter((p) => p.badge === "best");
  const recent = products.slice(0, 8);

  return (
    <div className="pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="container py-10 md:py-16">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.tagline}</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {t.home.bannerTitle}
              </h1>
              <p className="mt-3 text-muted-foreground md:text-lg">
                {t.home.bannerSub}
              </p>
              <Button size="lg" className="mt-6">
                {t.home.bannerCta}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="relative aspect-square max-w-sm md:max-w-md md:ml-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200 to-purple-200 blur-3xl opacity-60" />
              <img
                src="https://images.unsplash.com/photo-1522335789203-aaa90ad8c2b3?w=800&q=80"
                alt="hero"
                className="relative h-full w-full rounded-3xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b bg-background">
        <div className="container grid grid-cols-3 gap-4 py-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">한국 → 라오스 직배송</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">100% 정품 보장</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">현지 통화 결제 지원</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <h2 className="mb-4 text-lg font-bold">카테고리</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {(
            Object.keys(t.categories) as Array<keyof typeof t.categories>
          ).map((key) => (
            <button
              key={key}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-3 transition hover:border-primary hover:bg-accent/50"
            >
              <span className="text-3xl">{categoryIcons[key]}</span>
              <span className="text-xs font-medium">{t.categories[key]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-bold md:text-xl">
            🔥 {t.home.bestseller}
          </h2>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {t.home.seeAll} →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container py-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-bold md:text-xl">
            ✨ {t.home.newArrival}
          </h2>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {t.home.seeAll} →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
