"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard, Building2, Smartphone, MapPin, CheckCircle2 } from "lucide-react";

const SHIPPING = 15000;
const FREE_SHIPPING_THRESHOLD = 50000;

type Payment = "card" | "bank" | "easypay";

export default function CheckoutPage() {
  const router = useRouter();
  const locale = useStore((s) => s.locale);
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const t = dict[locale];

  const [payment, setPayment] = useState<Payment>("easypay");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = cart.reduce(
    (sum, c) => sum + c.product.price * c.quantity,
    0
  );
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING;
  const total = subtotal + shippingFee;

  if (done) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-sm text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-500" />
          <h2 className="mt-4 text-2xl font-bold">주문이 완료되었습니다!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            주문번호: ORD-2026-{Math.floor(Math.random() * 100000)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            7~10일 내로 라오스 배송지에 도착 예정입니다.
          </p>
          <Button className="mt-6" onClick={() => router.push("/")}>
            홈으로
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 md:pb-12">
      <div className="container py-6">
        <h1 className="text-2xl font-bold">{t.checkout.title}</h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardContent className="p-5">
                <h2 className="mb-4 flex items-center gap-2 font-bold">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t.checkout.shippingAddress}
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.checkout.name}
                    </label>
                    <Input className="mt-1" placeholder="ຊື່" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.checkout.phone}
                    </label>
                    <Input className="mt-1" placeholder="+856 20 ..." />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.checkout.country}
                    </label>
                    <Input
                      className="mt-1"
                      defaultValue="Laos (ລາວ)"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.checkout.city}
                    </label>
                    <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option>Vientiane (ວຽງຈັນ)</option>
                      <option>Luang Prabang (ຫຼວງພະບາງ)</option>
                      <option>Pakse (ປາກເຊ)</option>
                      <option>Savannakhet (ສະຫວັນນະເຂດ)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.checkout.address}
                    </label>
                    <Input className="mt-1" placeholder="Village / Road / House No." />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items summary */}
            <Card>
              <CardContent className="p-5">
                <h2 className="mb-4 font-bold">주문 상품 ({cart.length})</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={item.product.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {item.product.brand}
                        </p>
                        <h3 className="line-clamp-1 text-sm font-medium">
                          {item.product.name[locale]}
                        </h3>
                        <div className="mt-0.5 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {item.option && `${item.option} · `}수량 {item.quantity}
                          </span>
                          <span className="text-sm font-bold">
                            {formatPrice(item.product.price * item.quantity, locale)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardContent className="p-5">
                <h2 className="mb-4 font-bold">{t.checkout.payment}</h2>
                <div className="space-y-2">
                  {(
                    [
                      { key: "easypay", icon: Smartphone, label: t.checkout.easypay },
                      { key: "card", icon: CreditCard, label: t.checkout.card },
                      { key: "bank", icon: Building2, label: t.checkout.bank },
                    ] as const
                  ).map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.key}
                        onClick={() => setPayment(p.key)}
                        className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left ${
                          payment === p.key
                            ? "border-primary bg-primary/5"
                            : "border-input"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            payment === p.key ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="flex-1 text-sm font-medium">{p.label}</span>
                        <div
                          className={`h-4 w-4 rounded-full border-2 ${
                            payment === p.key
                              ? "border-primary bg-primary"
                              : "border-input"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
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
              <div className="border-t pt-3" />
              <div className="flex justify-between">
                <span className="font-bold">{t.cart.total}</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(total, locale)}
                </span>
              </div>

              <label className="flex items-start gap-2 pt-2 text-xs">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="text-muted-foreground">
                  {t.checkout.agree}
                </span>
              </label>

              <Button
                className="w-full"
                size="lg"
                disabled={!agreed || cart.length === 0}
                onClick={() => {
                  clearCart();
                  setDone(true);
                }}
              >
                {formatPrice(total, locale)} {t.checkout.placeOrder}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
