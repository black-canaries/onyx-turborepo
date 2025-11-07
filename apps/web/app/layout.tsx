import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/styles.css";
import { cx } from "@repo/ui";
import { Providers } from "./providers";
import { Theme } from "./providers/theme";

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
      <body className={cx(inter.variable, "bg-primary antialiased")}>
        <Providers>
          <Theme>
            {children}
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
