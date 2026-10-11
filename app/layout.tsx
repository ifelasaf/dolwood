import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { site, siteUrl, pathHref } from "@/lib/site";
import YandexMetrica from "@/components/YandexMetrica";
import MobileAction from "@/components/MobileAction";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import "./globals.css";
const display = localFont({ src: "./fonts/PlayfairDisplay.ttf", variable: "--font-display", display: "swap", weight: "400 900" });
const body = localFont({ src: "./fonts/Manrope.ttf", variable: "--font-body", display: "swap", weight: "200 800" });
export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  icons: { icon: [
    { url: pathHref("/favicon-v2-32.png"), type: "image/png", sizes: "32x32" },
    { url: pathHref("/favicon-v2-192.png"), type: "image/png", sizes: "192x192" },
  ] },
  robots: { index: true, follow: true },
  verification: { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined },
};
export const viewport: Viewport = { themeColor: "#ede7db", width: "device-width", initialScale: 1 };
const jsonLd = { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#organization`,
  name: "Dolwood", url: `${siteUrl}/`, logo: `${siteUrl}/logo-v3.png`, telephone: "+79267174764", email: site.email,
  description: "Буковая доска оптом и изготовление мебельных заготовок в городском округе Щёлково, Московская область.",
  sameAs: [site.telegram] };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru" className={`${display.variable} ${body.variable}`}><body>
    <a className="skip-link" href="#main-content">Перейти к содержанию</a>
    <YandexMetrica /><Header />{children}<Footer /><MobileAction /><ScrollTop />
    <Script src="https://code.jivo.ru/widget/IPo9Nx4dIu" strategy="afterInteractive" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </body></html>;
}
