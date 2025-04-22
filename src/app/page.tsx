import Image from "next/image";
import logo from "@/assets/img/Logo.webp";

export default function Home() {
  return (
    <div className="min-h-svh flex justify-center items-center flex-col gap-10">
            <h1 className="font-old-standard text-5xl text-primary"> SUI velas</h1>
      <Image src={logo} alt="logo" priority />
    </div>
  );
}
