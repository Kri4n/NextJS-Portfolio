import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import "./globals.css";

export const metadata: Metadata = {
  title: "Krian Lloyd Lerry | Software Engineer | Portfolio",
  description:
    "Portfolio of Krian Lloyd Lerry, a Filipino Software Engineer skilled in MERN, Flutter, Next.js and more.",
  keywords: [
    "Krian Lloyd Lerry",
    "Krian",
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
    title: "Krian Lloyd Lerry | Software Engineer | Portfolio",
    description:
      "Portfolio of Krian Lloyd Lerry, a Software Engineer skilled in MERN, Flutter, Next.js and more.",
    siteName: "Krian Lloyd Lerry | Portfolio",
    images: [
      {
        url: "https://kri4n.vercel.app/images/krian.png",
        width: 1200,
        height: 630,
        alt: "Krian Lloyd Lerry Portfolio",
      },
    ],
  },
  metadataBase: new URL("https://kri4n.vercel.app"),
  alternates: {
    canonical: "https://kri4n.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="google5d08b0297611da1e"
        />
      </head>
      <body className="font-dm-sans antialiased bg-[#0a0a0a] text-[#e8e3da] cursor-none">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
