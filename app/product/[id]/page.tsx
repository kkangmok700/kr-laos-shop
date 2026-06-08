"use client";
import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  Star,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const locale = useStore((s) => s.locale);
  const addToCart = useStore((s) => s.addToCart);
  const t = dict[locale];
  const product = getProduct(id) ?? products[0];

  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);
  const [tab, setTab] = useState<"desc" | "review" | "qna" | "info">("desc");

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="pb-32 md:pb-12">
      <div className="container py-4 md:py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={product.image}
                alt={product.name[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.badge && (
                <div className="absolute left-3 top-3">
                  <Badge variant={product.badge}>
                    {product.badge === "sale" && t.common.sale}
                    {product.badge === "new" && t.common.new}
                    {product.badge === "best" && t.common.best}
                  </Badge>
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map(
                (img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg border bg-secondary"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">
              {product.name[locale]}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">4.8</span>
              <span className="text-muted-foreground">(248)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              {discount > 0 && (
                <span className="text-2xl font-bold text-rose-500">
                  {discount}%
                </span>
              )}
              <span className="text-2xl font-bold">
                {formatPrice(product.price, locale)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice, locale)}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {product.description[locale]}
            </p>

            {/* Info Cards */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Card>
                <CardContent className="flex flex-col items-center gap-1 p-3 text-center">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-medium leading-tight">
                    7~10일 배송
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-1 p-3 text-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-medium leading-tight">
                    정품보장
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-1 p-3 text-center">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-medium leading-tight">
                    7일 교환
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Options */}
            {product.options && (
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium">{t.detail.option}</p>
                <div className="flex flex-wrap gap-2">
                  {product.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                        selectedOption === i
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-input"
                      }`}
                    >
                      {opt[locale]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm font-medium">{t.detail.qty}</span>
              <div className="flex items-center rounded-md border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-accent"
                  aria-label="decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-10 text-center text-sm font-medium">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 hover:bg-accent"
                  aria-label="increase"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="mt-6 hidden gap-2 md:flex">
              <Button variant="outline" size="icon" aria-label="wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="share">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => {
                  addToCart(
                    product,
                    qty,
                    product.options?.[selectedOption][locale]
                  );
                  router.push("/cart");
                }}
              >
                {t.detail.addCart}
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  addToCart(
                    product,
                    qty,
                    product.options?.[selectedOption][locale]
                  );
                  router.push("/checkout");
                }}
              >
                {t.detail.buyNow}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b">
            {(["desc", "review", "qna", "info"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-1 py-3 text-sm font-medium ${
                  tab === k
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t.detail[k]}
              </button>
            ))}
          </div>
          <div className="py-8 text-sm text-muted-foreground">
            {tab === "desc" && (
              <div className="space-y-3">
                <p>{product.description[locale]}</p>
                <div className="relative mt-4 aspect-[3/2] overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            {tab === "review" && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className="h-3 w-3 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="font-medium text-foreground">
                          user_{i}**
                        </span>
                        <span>2026.05.{20 + i}</span>
                      </div>
                      <p className="mt-2 text-foreground">
                        피부에 잘 맞고 향도 좋아요. 라오스 배송도 빨라서 만족합니다!
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {tab === "qna" && <p>등록된 문의가 없습니다.</p>}
            {tab === "info" && (
              <ul className="space-y-2 text-foreground">
                <li>• 배송지: 한국 → 라오스 (비엔티안/루앙프라방/팍세/사반나켓)</li>
                <li>• 배송기간: 7~10영업일</li>
                <li>• 배송비: 50,000원 이상 무료 (이하 ₩15,000)</li>
                <li>• 교환/반품: 수령 후 7일 이내</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background p-3 md:hidden">
        <div className="container flex gap-2">
          <Button variant="outline" size="icon" aria-label="wishlist">
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              addToCart(
                product,
                qty,
                product.options?.[selectedOption][locale]
              );
              router.push("/cart");
            }}
          >
            {t.detail.addCart}
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              addToCart(
                product,
                qty,
                product.options?.[selectedOption][locale]
              );
              router.push("/checkout");
            }}
          >
            {t.detail.buyNow}
          </Button>
        </div>
      </div>
    </div>
  );
}
