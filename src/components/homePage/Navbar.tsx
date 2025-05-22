import Isologo from "@/assets/icons/Isologo";
import TextLogo from "@/assets/icons/TextLogo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-4 lg:px-8 xl:px-40 flex justify-between items-center border-b border-b-primary/30 mb-10 py-4">
      <div className="flex justify-center items-center">
        <Link href="/">
          <TextLogo className="w-auto h-11" />
        </Link>
      </div>
      <div>
        <a className="py-2 px-4 bg-primary text-white rounded">Guia Gratuita</a>
      </div>
    </nav>
  );
}
