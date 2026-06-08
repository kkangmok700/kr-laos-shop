import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "K-Beauty 라오스 | K-Beauty Laos",
  description: "한국 뷰티, 라오스 직배송 | Korean beauty delivered to Laos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background antialiased">
        <Header />
        <main>{children}</main>
        <footer className="mt-16 border-t bg-secondary/40">
          <div className="container py-8 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">K-Beauty 라오스</p>
            <p className="mt-1">한국 ↔ 라오스 양국간 뷰티 직거래 쇼핑몰</p>
            <p className="mt-2">© 2026 K-Beauty Laos. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
