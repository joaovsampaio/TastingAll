import "./globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "TastingAll",
  description:
    "Descubra, compartilhe e saboreie um mundo de sabores no TastingAll!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
