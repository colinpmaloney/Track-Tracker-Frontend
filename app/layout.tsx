/**
 * Root layout shared by every page — loads fonts, wraps content in Header/Footer,
 * and sets the default site metadata.
 */

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./ui/header";
import { Footer } from "./ui/footer";

const inter = Inter({     
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Track Tracker",
  description: "Track your favorite music and discover new tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
