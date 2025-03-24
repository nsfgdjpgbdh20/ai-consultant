import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIコンサルタント | プロフェッショナルAIコンサルティングサービス",
  description: "AIの力で企業の成長を加速させます。専門的な知識と実績を持つAIコンサルタントが、あなたのビジネスに最適なAIソリューションを提案します。",
  keywords: "AIコンサルタント, AI開発, 機械学習, ビジネス戦略, デジタルトランスフォーメーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased bg-gradient-to-b from-gray-50 to-white`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
