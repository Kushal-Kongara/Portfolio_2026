import type { Metadata } from "next";
import { DM_Sans, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import "./globals.css";

const SpotifyWidget = dynamic(() => import("@/components/SpotifyWidget"), { ssr: false });

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Kushal Kongara | Portfolio",
  description: "Product Designer & Frontend Engineer",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3" },
      { url: "/icon.png?v=3", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/apple-touch-icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
        <SpotifyWidget />
        <Analytics />
      </body>
    </html>
  );
}
