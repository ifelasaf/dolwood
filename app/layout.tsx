import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dolwood.ru"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  title: "Dolwood — буковая доска оптом и мебельные заготовки на заказ | Щёлково",
  description:
    "Производство пиломатериалов из бука в Щёлково. Оптовые продажи буковой доски камерной сушки от 1 м³ и изготовление мебельных заготовок (ножки, подлокотники, царги, балясины) по чертежам. Доставка по России.",
  keywords: [
    "буковая доска оптом",
    "доска бук камерной сушки",
    "мебельные заготовки на заказ",
    "ножки для мебели из бука",
    "мебельный щит бук",
    "пиломатериал бук",
    "Dolwood",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Dolwood — буковая доска оптом и заготовки на заказ",
    description:
      "Бук от производителя в Щёлково: доска оптом от 1 м³ и мебельные заготовки по чертежам. Доставка по России.",
    siteName: "Dolwood",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ede7db",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dolwood",
  description:
    "Производство буковой доски и мебельных заготовок на заказ в Щёлково.",
  areaServed: "RU",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Щёлково",
    addressRegion: "Московская область",
    addressCountry: "RU",
  },
  telephone: "+79267174764",
  email: site.email,
  makesOffer: [
    { "@type": "Offer", name: "Буковая доска оптом" },
    { "@type": "Offer", name: "Изготовление мебельных заготовок на заказ" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
