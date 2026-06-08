"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const SHIPPING = 15000;
const FREE_SHIPPING_THRESHOLD = 50000;

export default function CartPage() {
  const locale = useStore((s) => s.locale);
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const t = dict[locale];

  const [selected, setSelected] = useState<Set<string>>(
    new Set(cart.map((c) => c.product.id))
  );

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleSelectAll = () => {
    if (selected.size === cart.length) setSelected(new Set());
    else setSelected(new Set(cart.map((c) => c.product.id)));
  };

  const selectedItems = cart.filter((c) => selected.has(c.product.id));
  const subtotal = selectedItems.reduce(
    (sum, c) => sum + c.product.price * c.quantity,
    0
  );
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING;
  const total = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-sm text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
          <h2 className="mt-4 text-xl font-bold">{t.cart.empty}</h2>
          <Link href="/">
            <Button className="mt-6">{t.home.bannerCta}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 md:pb-12">
      <div className="container py-6">
        <h1 className="text-2xl font-bold">
          {t.cart.title}{" "}
          <span className="text-muted-foreground">({cart.length})</span>
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-3">
            <Card>
              <CardContent className="flex items-center gap-3 p-3">
                <input
                  type="checkbox"
                  checked={selected.size === cart.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm font-medium">{t.cart.selectAll}</span>
              </CardContent>
            </Card>

            {cart.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={selected.has(item.product.id)}
                      onChange={() => toggleSelect(item.product.id)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={item.product.image}
                        alt={item.product.name[locale]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {item.product.brand}
                      </p>
                      <h3 className="line-clamp-2 text-sm font-medium">
                        {item.product.name[locale]}
                      </h3>
                      {item.option && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.option}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-bold">
                        {formatPrice(item.product.price * item.quantity, locale)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-end">
                    <div className="flex items-center rounded-md border">
                      <button
                        onClick={() =>
                          updateQty(item.product.id, item.quantity - 1)
                        }
                        className="p-1.5 hover:bg-accent"
                        aria-label="decrease"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.product.id, item.quantity + 1)
                        }
                        className="p-1.5 hover:bg-accent"
                        aria-label="increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="h-fit lg:sticky lg:top-20">
            <CardContent className="space-y-3 p-5">
              <h3 className="font-bold">{t.checkout.summary}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.cart.subtotal}</span>
                <span className="font-medium">{formatPrice(subtotal, locale)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.cart.shipping}</span>
                <span className="font-medium">
                  {shippingFee === 0 ? t.cart.free : formatPrice(shippingFee, locale)}
                </span>
              </div>
              {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="rounded-md bg-accent/50 p-2 text-xs text-accent-foreground">
                  {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal, locale)} 더 담으면 무료배송!
                </p>
              )}
              <div className="border-t pt-3" />
              <div className="flex justify-between">
                <span className="font-bold">{t.cart.total}</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(total, locale)}
                </span>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full" size="lg" disabled={selected.size === 0}>
                  {t.cart.checkout} ({selected.size})
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile sticky checkout */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background p-3 lg:hidden">
        <div className="container flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">{t.cart.total}</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(total, locale)}
            </p>
          </div>
          <Link href="/checkout" className="flex-1">
            <Button className="w-full" size="lg" disabled={selected.size === 0}>
              {t.cart.checkout} ({selected.size})
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
