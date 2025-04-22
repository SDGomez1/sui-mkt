import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Danos tu feedback | SUI",
  description: "pagina para obtener feedback"
};
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
