import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_URL),
  title: {
    default: "Blog do Controle Dois | Gestão, fiscal e dicas para o seu negócio",
    template: "%s | Blog do Controle Dois",
  },
  description:
    "Artigos sobre gestão, financeiro, notas fiscais, PDV e novidades do sistema Controle Dois para empresas de vários segmentos.",
  openGraph: { type: "website", siteName: "Blog do Controle Dois", locale: "pt_BR", images: ["/logo.png"] },
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
