import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AnimatedCursor } from "@/components/animatedComponents";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TensorsOfTheWall | Sandesh Bharadwaj",
  description: "Sandesh Bharadwaj's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}
      >
        <AnimatedCursor />
        <Header />
        <div id="page-container">
        <main style={{paddingBottom: '[footer-height]px', flex:1}}>
        <AntdRegistry>{children}</AntdRegistry>
        </main>
        <Footer />
        </div>
      </body>
    </html>
  );
}
