"use client";
import Navbar from "@/components/homePage/Navbar";
import Image from "next/image";
import productImage from "@/assets/img/product image.png";
import { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import Footer from "@/components/homePage/Footer";

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  return (
    <section>
      <Navbar></Navbar>
      <div className="px-32 flex justify-center ">
        <div className="justify-center w-[48%] shrink-0 flex items-center max-h-[500px]">
          <Image src={productImage} alt=""></Image>
        </div>
        <div className="w-[48%] ">
          <h1 className="font-old-standard text-4xl font-medium mb-4">
            Vela oración
          </h1>
          <p>
            ¿Qué pasaría si cada oración pudiera ser un encuentro verdaderamente
            profundo y de conexión con Dios?
          </p>
          <div className="mt-4 flex items-center gap-4 text-lg">
            <p className="font-bold text-neutral-500 line-through">$45.000 </p>
            <p className="font-bold">$40.000</p>
          </div>
          <p className="mb-4 text-sm font-medium">
            Tamaño de la vela: <span className="text-neutral-600">200g</span>
          </p>
          <p>
            Nuestra Vela de Oración es mucho más que una simple vela; es una
            inversión en tu vida espiritual. El valor de esta vela reside en su
            capacidad para transformar instantáneamente tu entorno y tu estado
            mental, convirtiéndose en el catalizador físico para una oración más
            profunda y significativa. Es tu camino hacia una vida de oración más
            rica e intencional.
          </p>
          <p className="font-medium mt-4">cantidad:</p>
          <div className="flex items-center gap-4">
            <div className="flex-col min-w-32">
              <div className="flex border p-2 justify-between border-neutral-300 text-xl">
                <button
                  onClick={() => setQuantity(quantity - 1)}
                  className="px-2 cursor-pointer"
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <Link href={"/checkout"}>
              <button className="cursor-pointer bg-primary py-2 px-4 text-white font-medium h-full">
                Compra ahora
              </button>
            </Link>
          </div>
          <h2 className="text-lg font-medium mt-8 mb-2"> Vas a lograr:</h2>
          <ul className=" text-sm space-y-4">
            <li className="flex gap-2 ">
              <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                <CheckIcon className="text-white" />
              </span>
              <p>
                Crear instantáneamente una atmósfera con propósito. Su valor es
                proporcionarle un recordatorio a tu mente y espíritu de que es
                momento de orar.{" "}
                <span className="font-medium">
                  (No más ambientes distractores).
                </span>
              </p>
            </li>
            <li className="flex gap-2 ">
              <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                <CheckIcon className="text-white" />
              </span>
              <p>
                Silenciar el ruido y mantenerte en el presente con la musica del
                QR.{" "}
                <span className="font-medium">
                  (Adiós a pensamientos que distraen).
                </span>
              </p>
            </li>{" "}
            <li className="flex gap-2 ">
              <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                <CheckIcon className="text-white" />
              </span>
              <p>
                Acceder a una guía online exclusiva que te recuerda la verdadera
                intención de la oración: su propósito, su poder y cómo
                participar de ella con gozo.
                <span className="font-medium">
                  (La claridad reemplaza la confusión).
                </span>
              </p>
            </li>
            <li className="flex gap-2 ">
              <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                <CheckIcon className="text-white" />
              </span>
              <p>
                Tener un símbolo tangible de tu compromiso. Encenderla se
                convierte en un acto consciente, estableciendo tu intención para
                una conversación significativa con Dios.
                <span className="font-medium">(Oración con propósito)</span>
              </p>
            </li>
            <li className="flex gap-2 ">
              <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                <CheckIcon className="text-white" />
              </span>
              <p>
                Tener una herramienta tangible que te ayuda a construir un
                hábito de oración consistente que esperarás con ansias.
                <span className="font-medium">
                  (no más intentos esporádicos).
                </span>
              </p>
            </li>
            <li className="flex gap-2 ">
              <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
                <CheckIcon className="text-white" />
              </span>
              <p>
                Conocer la oración no como una obligación, sino como una
                oportunidad para acercarte.
                <span className="font-medium">
                  (La anticipación reemplaza la apatía).
                </span>
              </p>
            </li>
          </ul>
          <h2 className="font-old-standard text-xl mt-8">
            Imagínate ya no tener distracciónes en el momento de orar.
          </h2>
          <p className="mt-2 mb-4 font-medium">
            Con la Experiencia de vela oracion, te conviertes en alguien que:
          </p>
          <ul className="space-y-2  list-inside list-disc">
            <li>Recuerda la oración con gozo y significado.</li>
            <li>
              Tiene vitalidad espiritual renovada y tu paz pueden ser un
              testimonio gentil para quienes te rodean.
            </li>
            <li>
              Reconoce el verdadero significado de la oración y su poder en tu
              vida.
            </li>
            <li>
              pasas de ser alguien que desea una vida de oración más profunda a
              alguien que la cultiva y experimenta activamente
            </li>
          </ul>
          <p className="my-4">
            Si nada cambia, esos momentos de desconexión podrían continuar... El
            anhelo de una conexión más profunda podría seguir siendo solo un
            anhelo. La oración podría seguir sintiéndose como una casilla por
            marcar en lugar de un encuentro apreciado. Sólo tu haces el cambio..
          </p>
          <p className="mb-4">
            ¿Estas hlista(o) para transformar tu tiempo de oración en una
            experiencia llena de gozo y profundamente conectada?
          </p>
          <Link href={"/checkout"}>
            <button className="cursor-pointer bg-primary py-2 px-4 text-white font-medium flex justify-center items-center mx-auto mb-6">
              Compra ahora
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}
