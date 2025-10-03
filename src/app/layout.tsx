import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Roboto_Slab } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krian • Software Engineer",
  description:
    "Portfolio of Krian Lloyd Lerry, a Filipino Software Engineer skilled in MERN, Flutter, Next.js and more.",
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
  authors: [{ name: "Krian Lloyd Lerry", url: "https://kri4n.vercel.app" }],
  openGraph: {
    type: "website",
    url: "https://kri4n.vercel.app",
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
  metadataBase: new URL("https://kri4n.vercel.app"), // ensures correct absolute URLs
  alternates: {
    canonical: "https://kri4n.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="google5d08b0297611da1e.html"
        />

        {/* CSS Animations */}
        <link
          href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.className} ${robotoSlab.className}`}>
        {children}

        {/* Vanta.js */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js" />

        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      </body>
    </html>
  );
}
