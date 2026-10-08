import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { businessSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // "./" se resuelve por ruta: cada página declara su propia URL, sin query string.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "IMPYSERV",
    locale: "es_BO",
    url: "./",
  },
  twitter: { card: "summary_large_image" },
  title: {
    default: "IMPYSERV — Especialistas en Climatización | Santa Cruz, Bolivia",
    template: "%s | IMPYSERV",
  },
  description:
    "Más de 10 años instalando y dando mantenimiento a equipos de climatización en toda Bolivia. Split, VRF, ductos, cámaras frigoríficas. Emergencias 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
