"use client";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { LanguageToggle } from "./language-toggle";
import { Input } from "./ui/input";

export function Header() {
  const locale = useStore((s) => s.locale);
  const cart = useStore((s) => s.cart);
  const t = dict[locale];
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center gap-3 md:h-16">
        <button className="md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            K
          </div>
          <span className="hidden font-bold sm:inline-block">{t.brand}</span>
        </Link>

        <div className="ml-2 hidden flex-1 md:block">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t.search}
              className="h-9 rounded-full bg-secondary pl-9"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-3">
          <LanguageToggle />
          <button className="hidden md:inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium hover:bg-accent">
            <User className="h-4 w-4" />
            <span>{t.nav.login}</span>
          </button>
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
            aria-label={t.nav.cart}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="container md:hidden pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t.search}
            className="h-9 rounded-full bg-secondary pl-9"
          />
        </div>
      </div>
    </header>
  );
}
