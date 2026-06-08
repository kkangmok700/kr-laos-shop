"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "./i18n";
import type { Product } from "./products";

type CartItem = {
  product: Product;
  quantity: number;
  option?: string;
};

type Store = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  cart: CartItem[];
  addToCart: (p: Product, qty?: number, option?: string) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      locale: "ko",
      setLocale: (locale) => set({ locale }),
      cart: [],
      addToCart: (product, quantity = 1, option) =>
        set((state) => {
          const existing = state.cart.find((c) => c.product.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.product.id === product.id
                  ? { ...c, quantity: c.quantity + quantity }
                  : c
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity, option }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((c) => c.product.id !== id),
        })),
      updateQty: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((c) =>
            c.product.id === id ? { ...c, quantity: Math.max(1, quantity) } : c
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "kr-laos-shop" }
  )
);
