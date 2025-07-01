import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import { AnimatedCursor } from "@/components/animatedComponents";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import 'katex/dist/katex.min.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Sandesh Bharadwaj | TensorsOfTheWall",
    description: "AI Researcher and Engineer with 4+ years of experience in autonomous systems, computer vision and software engineering.",
    alternates: {
        canonical: "https://www.tensorsofthewall.com/hero",
    },
    openGraph: {
        title: "Sandesh Bharadwaj | TensorsOfTheWall",
        description: "AI Researcher and Engineer with 4+ years of experience in autonomous systems, computer vision and software engineering.",
        url: "https://www.tensorsofthewall.com/hero",
        images: [
          {
            url: "https://www.tensorsofthewall.com/images/banners/hero_banner.png",
            width: 960,
            height: 640,
            alt: "TensorsOfTheWall Hero Banner",
          }
        ],
        type: "website",
    },
    keywords: [
        "AI",
        "software engineering",
        "autonomous systems",
        "computer vision",
        "generative AI",
        "TensorsOfTheWall",
        "Sandesh Bharadwaj",
        "hero section",
        "neural network",
        "portfolio",
        "deep learning",
        "machine learning",
        "AI research",
    ],
    twitter: {
        card: "summary_large_image",
        title: "Sandesh Bharadwaj | TensorsOfTheWall",
        description: "AI Researcher and Engineer with 4+ years of experience in autonomous systems, computer vision and software engineering.",
        site: "@tensorofthewall",
        images: ["https://www.tensorsofthewall.com/images/banners/hero_banner.png"],
    },
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
        {/* <AnimatedCursor /> */}
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
