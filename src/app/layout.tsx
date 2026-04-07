import type { Metadata } from "next";
import { DM_Sans, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import "./globals.css";

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });

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
      { url: "/k-letter.png?v=4" },
    ],
    shortcut: "/k-letter.png?v=4",
    apple: "/k-letter.png?v=4",
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
        <ScrollProgress />
        <CommandPalette />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
