import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Cormorant_Garamond, Jost, Noto_Serif_Malayalam } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const notoSerifMalayalam = Noto_Serif_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meenu-weds-karthik.vercel.app"),
  title: "Meenu Weds Karthik | February 14, 2027",
  description:
    "Join us as Meenakshi & Karthikeyan celebrate their sacred union on February 14, 2027 in Ernakulam, Kerala. #MeenuWedsKarthik",
  keywords: ["wedding", "Kerala wedding", "Meenakshi", "Karthikeyan", "Ernakulam", "Kochi wedding invitation"],
  authors: [{ name: "Meenakshi & Karthikeyan" }],
  openGraph: {
    title: "Meenu Weds Karthik 💍 | February 14, 2027",
    description: "You are cordially invited to the sacred union of Meenakshi & Karthikeyan — February 14, 2027, Ernakulam, Kerala.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/gallery/photo-1.jpg",
        width: 1200,
        height: 630,
        alt: "Meenu & Karthik Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meenu Weds Karthik 💍",
    description: "A grand Kerala wedding celebration. February 14, 2027 | Ernakulam, Kerala",
    images: ["/gallery/photo-1.jpg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${jost.variable} ${notoSerifMalayalam.variable}`}
    >
      <body style={{ fontFamily: "var(--font-jost, 'Jost', sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
