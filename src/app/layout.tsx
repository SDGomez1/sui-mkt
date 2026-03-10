import type { Metadata } from "next";
import { Lora, Open_Sans, Poppins, Questrial } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
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
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D6KUHO3C77U0G2TEO1KG');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
