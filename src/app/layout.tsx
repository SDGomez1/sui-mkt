import type { Metadata } from "next";
import {
  Old_Standard_TT,
  Open_Sans,
  Playfair_Display,
  Questrial,
} from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import PageView from "@/components/posthog/PageView";
import { Toaster } from "@/components/ui/toaster";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const oldStandard = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-old-standard",
});
export const metadata: Metadata = {
  title: "Sui",
  description: "Mejora tu conexion con Dios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${questrial.className} ${oldStandard.variable} ${openSans.className} antialiased`}
      >
        <Providers>
          <PageView />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
