import type { Metadata } from "next";
import { Old_Standard_TT, Questrial } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import PageView from "@/components/posthog/PageView";
import { Toaster } from "@/components/ui/toaster";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

const oldStandard = Old_Standard_TT({
  weight: "700",
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
        className={`${questrial.className} ${oldStandard.variable} antialiased`}
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
