import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Theme } from "./providers/theme";
import "@repo/ui/styles/global.css";

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
      <body className="bg-primary antialiased">
        <Providers>
          <Theme>
            {children}
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
