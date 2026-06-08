"use client";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Badge } from "./ui/badge";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const locale = useStore((s) => s.locale);
  const t = dict[locale];
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute left-2 top-2">
            <Badge variant={product.badge}>
              {product.badge === "sale" && t.common.sale}
              {product.badge === "new" && t.common.new}
              {product.badge === "best" && t.common.best}
            </Badge>
          </div>
        )}
      </div>
      <div className="px-1 py-3">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-medium">
          {product.name[locale]}
        </h3>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          {discount > 0 && (
            <span className="text-sm font-bold text-rose-500">
              {discount}%
            </span>
          )}
          <span className="text-sm font-bold">
            {formatPrice(product.price, locale)}
          </span>
        </div>
        {product.originalPrice && (
          <p className="text-xs text-muted-foreground line-through">
            {formatPrice(product.originalPrice, locale)}
          </p>
        )}
      </div>
    </Link>
  );
}
