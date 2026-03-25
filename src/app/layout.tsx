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
  metadataBase: new URL("https://geethu-weds-mahesh.vercel.app"),
  title: "Geethu Weds Mahesh | April 16, 2026",
  description:
    "Join us as Geethu & Mahesh celebrate their sacred union on April 16, 2026 at Mannorkkavu Vanadurgga Auditorium, Mynagappally, Kerala.",
  keywords: ["wedding", "Kerala wedding", "Geethu", "Mahesh", "Mynagappally", "Kollam wedding invitation"],
  authors: [{ name: "Geethu & Mahesh" }],
  openGraph: {
    title: "Geethu Weds Mahesh 🪔 | April 16, 2026",
    description: "You are cordially invited to the sacred union of Geethu & Mahesh — April 16, 2026, Mynagappally, Kerala.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geethu Weds Mahesh 🪔",
    description: "A grand Kerala wedding celebration. April 16, 2026 | Mynagappally, Kerala",
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
