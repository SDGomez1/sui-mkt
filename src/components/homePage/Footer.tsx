import Isologo from "@/assets/icons/Isologo";
import { Globe, Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary mt-10 min-h-20 flex px-4 xl:px-40 justify-between items-center bg-primary/7">
      <div className="flex justify-center items-center">
        <Isologo className="h-20" />
        <p className="font-old-standard text-3xl text-primary">Sui</p>
      </div>
      <div className="flex justify-center items-center flex-col gap-4 lg:flex-row">
        <a
          href="tel:3173914524"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <Phone size={20} />
          <span>317 391 4524</span>
        </a>
        
        <a
          href="https://instagram.com/sui.velas"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <Instagram size={20} />
          <span>sui.velas</span>
        </a>
      </div>
    </footer>
  );
}
