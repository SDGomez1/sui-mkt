import Isologo from "@/assets/icons/Isologo";

export default function Navbar() {
  return (
    <nav className="px-4 lg:px-8 xl:px-40 flex justify-between items-center border-b border-b-primary/30 mb-10">
      <div className="flex justify-center items-center">
        <Isologo className="h-20" />
        <p className="font-old-standard text-3xl text-primary">Sui</p>
      </div>
      <div>
        <a className="py-2 px-4 bg-primary text-white rounded">Guia Gratuita</a>
      </div>
    </nav>
  );
}
