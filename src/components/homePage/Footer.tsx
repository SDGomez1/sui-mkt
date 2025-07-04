import Isologo from "@/assets/icons/Isologo";
import TextLogo from "@/assets/icons/TextLogo";
import { Globe, Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary mt-auto min-h-20 flex px-4 xl:px-40 justify-between items-center pb-6">
      <div className="flex justify-center items-center">
        <TextLogo className="h-15 opacity-80" />
      </div>
      <div className="flex justify-center items-center flex-col gap-4 lg:flex-row">
        <a
          href="tel:3173914524"
          className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors"
        >
          <Phone size={20} />
          <span>317 391 4524</span>
        </a>
        
        <a
          href="https://instagram.com/sui.velas"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors"
        >
          <Instagram size={20} />
          <span>sui.velas</span>
        </a>
      </div>
    </footer>
  );
}
