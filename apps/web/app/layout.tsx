import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Theme } from "./providers/theme";
import { RouteProvider } from "./providers/route-provider";
import { AppShell } from "./components/app-shell";

import "@repo/ui/styles/globals.css";
import "./styles.css";

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
      <body className={`${inter.variable} bg-primary antialiased`}>
        <RouteProvider>
          <Providers>
            <Theme>
              <AppShell>{children}</AppShell>
            </Theme>
          </Providers>
        </RouteProvider>
      </body>
    </html>
  );
}
