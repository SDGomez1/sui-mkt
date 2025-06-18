"use client";
import TextLogo from "@/assets/icons/TextLogo";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col text-center px-6">
      <TextLogo />
      <h2 className="text-2xl font-bold my-3">
        Velas que guían a un encuentro con Dios
      </h2>
      <h3 className="text-xl text-primary font-bold">
        Transforma tu lugar secreto
      </h3>

      <button
        className="bg-primary text-white w-full rounded-2xl mt-6 mb-4 py-2 flex items-center justify-center gap-4"
        onClick={() => router.push("/#products")}
      >
        Catálogo <CircleArrowRight className="text-white" />
      </button>
      <button className="hidden bg-primary text-white w-full rounded-2xl mt-6 mb-4 py-2 items-center justify-center gap-4">
        Ebooks <CircleArrowRight className="text-white" />
      </button>
      <button
        className="bg-primary text-white w-full rounded-2xl mt-6 mb-4 py-2 flex items-center justify-center gap-4"
        onClick={() => router.push("https://wa.me/573173914524")}
      >
        WhatsApp <CircleArrowRight className="text-white" />
      </button>
      <Link href={"/"} className="underline mt-10">
        suivelas.com
      </Link>
    </div>
  );
}
