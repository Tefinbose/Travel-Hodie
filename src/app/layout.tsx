import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const instant = false;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TravelHodie | Explore the World with Us",
    template: "%s | TravelHodie",
  },
  description:
    "Discover unforgettable holidays, flights, hotels, visa assistance and customised travel packages with TravelHodie.",
  keywords: [
    "TravelHodie",
    "Travel Agency",
    "Holiday Packages",
    "International Tour Packages",
    "Domestic Tour Packages",
    "Flight Booking",
    "Hotel Booking",
    "Kerala Travel Agency",
  ],
  authors: [{ name: "TravelHodie" }],
  metadataBase: new URL("https://www.travelhodie.com"),
  openGraph: {
    title: "TravelHodie | Explore the World with Us",
    description:
      "Your journey, your story. Discover memorable travel experiences with TravelHodie.",
    url: "https://www.travelhodie.com",
    siteName: "TravelHodie",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className={`${jakarta.className} min-h-screen bg-white antialiased`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
