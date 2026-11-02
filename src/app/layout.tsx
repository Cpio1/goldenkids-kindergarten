import type { Metadata, Viewport } from "next";
import { Noto_Sans, Nunito } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import { SITE_URL, site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import "./globals.css";

// cyrillic-ext carries the Kazakh letters ә ғ қ ң ө ұ ү һ і
const body = Noto_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});
const heading = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const kk = dictionaries.kk.meta;
const ru = dictionaries.ru.meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: kk.title,
  description: kk.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: ["Golden Kids World", "балабақша", "балабақша Мамыр-4", "детский сад", "детский сад Мамыр-4", "детский сад на казахском языке"],
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_KZ"],
    url: "/",
    siteName: site.name,
    title: kk.title,
    description: `${kk.description} ${ru.description}`,
  },
  twitter: { card: "summary", title: kk.title, description: kk.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFEF7",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Only confirmed facts — no ratings, reviews, coordinates, city or opening days.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: site.name,
  url: SITE_URL,
  telephone: site.phone.href.replace("tel:", ""),
  address: { "@type": "PostalAddress", streetAddress: site.address },
  ...(site.instagramUrl ? { sameAs: [site.instagramUrl] } : {}),
};

// `js` enables reveal animations; if the app hasn't hydrated within 4 s, it is removed so nothing stays hidden.
const bootScript =
  "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__gkReady)document.documentElement.classList.remove('js')},4000);";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="kk"
      className={`${body.variable} ${heading.variable}${site.whatsapp.enabled ? " has-wa-float" : ""}`}
      style={{ backgroundColor: "#FFFEF7", colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
