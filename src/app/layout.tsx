import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vampay",
  description:
    "Vampay - Your All-in-One Payment Powerhouse! Accept Payments from any app through vampay and stay in control with your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F1F1F1] lg:w-[500px] m-auto`}>
        {children}
      </body>
    </html>
  );
}
