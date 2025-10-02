import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Montserrat, Roboto_Slab } from "next/font/google";
import AOSInit from "@/components/AOSInit";
import BootstrapInit from "@/components/BootstrapInit";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Krian • Software Engineer",
  description:
    "Portfolio of Krian Lloyd Lerry, a Software Engineer skilled in MERN, Flutter, Next.js and more.",
  keywords: [
    "Krian Lloyd Lerry",
    "Software Engineer",
    "Full Stack Developer",
    "MERN",
    "Next.js",
    "Flutter",
    "Portfolio",
    "Web Developer",
    "React.js",
  ],
  authors: [
    { name: "Krian Lloyd Lerry", url: "https://web.facebook.com/Kri4n/" },
  ],
  openGraph: {
    type: "website",
    url: "https://yourdomain.com",
    title: "Krian • Software Engineer",
    description:
      "Portfolio of Krian Lloyd Lerry, a Software Engineer skilled in MERN, Flutter, Next.js and more.",
    siteName: "Krian Lloyd Lerry | Portfolio",
    images: [
      {
        url: "https://yourdomain.com/preview.png", // Replace with your image
        width: 1200,
        height: 630,
        alt: "Krian Lloyd Lerry Portfolio Preview",
      },
    ],
  },
  metadataBase: new URL("https://yourdomain.com"), // ensures correct absolute URLs
  alternates: {
    canonical: "https://yourdomain.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* CSS Animations */}
        <link
          href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
          rel="stylesheet"
        />
      </Head>
      <body className={`${montserrat.className} ${robotoSlab.className}`}>
        {children}

        {/* Vanta.js */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js" />

        {/* Bootstrap JS */}
        <BootstrapInit />

        {/* AOS Script */}
        <AOSInit />
      </body>
    </html>
  );
}
