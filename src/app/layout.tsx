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
import Script from "next/script";

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
      <head>
        <Script
          id="metaPixelInit"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            <!-- Meta Pixel Code -->
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1409422410201442');
            fbq('track', 'PageView');
            <!-- End Meta Pixel Code -->`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            className="hidden"
            src="https://www.facebook.com/tr?id=1409422410201442&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
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
