import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import MouseFollower from "@/components/MouseFollower";
import ChatIcon from "@/components/ChatIcon"; // Add this import (you'll need to create this component)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Numan's Portfolio",
  description: "Modern & Minimal JS Mastery Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/icon/pngtree-n-symbol-letter-design-identity-png-image_3976218.png"
          sizes="any"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MouseFollower />
          {children}
          <ChatIcon /> {/* Add the chat icon component here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
