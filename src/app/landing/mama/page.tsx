import Footer from "@/components/homePage/Footer";
import ProductGallery from "./ProductGallery";
import { CheckIcon } from "lucide-react";
import Isologo from "@/assets/icons/Isologo";
import Link from "next/link";

export default function Page() {
  return (
    <section className="overflow-x-hidden max-w-svw min-h-svh flex flex-col bg-linear-to-b from-white to-[#F2F3FF]">
      <Isologo className="size-20 self-center" />
      <div className="flex px-4 2xl:px-40 xl:px-20 flex-col lg:flex-row justify-between items-center  my-auto">
        <div className="flex flex-col gap-8 lg:w-[47%] justify-center items-center">
          <ProductGallery />
          <p className="text-xl mt-4 font-old-standard text-primary italic text-center">
            ✨ No es sólo un regalo. Es un acto espiritual. Y muchas veces, eso
            es justo lo que se necesita✨
          </p>
          <div className=" text-center">
            <p className="text-lg  font-bold">
              Detalles que hacen la diferencia
            </p>
            <ul className="text-lg">
              <li>🕯️ Cera vegetal menos tóxica.</li>
              <li>🚚 Envío rápido y seguro.</li>
              <li>💬 Atención personalizada para ti.</li>
            </ul>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="font-old-standard text-3xl text-primary font-bold mt-8 lg:mt-0">
            ¿HACE CUÁNTO NO LE DICES A MAMÁ LO QUE SIGNIFICA PARA TI?
          </h1>
          <p className="font-bold text-2xl mt-4 ">$39.900 COP</p>
          <p className="text-xl mt-4 font-old-standard text-primary ">
            Este no es un regalo más. Es una herramienta para conectar.
          </p>
          <p className="text-xl mt-4">
            Cuando no sabes cómo decirlo, esta vela lo dice por ti. A veces,
            queremos decir tanto… pero las palabras no alcanzan. Este kit nació
            de esa necesidad:{" "}
            <span className=" underline">
              de decir lo importante sin hablar demasiado.
            </span>
          </p>
          <div className="bg-[#F2F3FF] rounded-2xl p-4 mt-4">
            <p className="text-lg mb-2">Con este kit lograras:</p>
            <ul className="text-lg space-y-2">
              <li className="flex gap-2 items-center">
                <span className="bg-[#DCDFFF] text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                  <CheckIcon />
                </span>
                Que el regalo no solo guste, sino que toque el alma.{" "}
              </li>
              <li className="flex gap-2 items-center">
                <span className="bg-[#DCDFFF] text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                  <CheckIcon />
                </span>
                Que tu mensaje se sienta, no solo se lea.
              </li>
              <li className="flex gap-2 items-center">
                <span className="bg-[#DCDFFF] text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                  <CheckIcon />
                </span>
                Que quien lo reciba te recuerde por cómo la hiciste sentir.
              </li>
            </ul>
          </div>
          <p className="text-xl mt-4 font-bold">
            ¿Quieres dar algo que no se olvide?
          </p>
          <p className=" mt-4 italic text-primary">empieza por aquí</p>

          <Link className="px-4 py-2 text-white bg-primary rounded mx-auto my-8 block text-center w-full hover:bg-primary-hover transition cursor-pointer" href="/checkout">
            Comprar
          </Link>
        </div>
      </div>

      <Footer />
    </section>
  );
}
