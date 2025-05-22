import type { Metadata } from "next";
import { Lora, Open_Sans, Poppins, Questrial } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import PageView from "@/components/posthog/PageView";
import Script from "next/script";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
      <head>
        {process.env.NODE_ENV == "production" && (
          <>
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
            <Script
              id="clarityPixelInit"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rgeothn41v");`,
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
          </>
        )}
      </head>
      <body
        className={`${questrial.className} ${oldStandard.variable} ${openSans.variable} antialiased ${poppins.className}`}
      >
        <Providers>
          <PageView />
          {children}
        </Providers>
      </body>
    </html>
  );
}
