import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "synaptic - AI Development Orchestrator",
  description: "Transform your development workflow with an orchestrated AI ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide Manus watermark */
            [class*="manus"], 
            [id*="manus"],
            div[style*="manus" i],
            div[style*="Made with" i],
            a[href*="manus" i] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }
            
            /* Hide any bottom-right positioned watermarks */
            div[style*="position: fixed"][style*="bottom"][style*="right"],
            div[style*="position:fixed"][style*="bottom"][style*="right"] {
              display: none !important;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}

