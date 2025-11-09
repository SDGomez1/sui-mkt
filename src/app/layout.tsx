import type { Metadata } from "next";
import { Lora, Open_Sans, Poppins, Questrial } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
const oldStandard = Lora({
  weight: ["400", "500", "700"],
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
        className={`${questrial.className} ${oldStandard.variable} ${openSans.variable} antialiased ${poppins.className}`}
      >
          <Toaster />
          {children}
      </body>
    </html>
  );
}
