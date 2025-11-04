import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cx } from "@repo/ui";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onyx - Built with Untitled UI",
  description: "A modern application built with Untitled UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cx(
          "min-h-screen antialiased",
          inter.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
