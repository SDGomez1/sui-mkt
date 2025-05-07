import trialdaysImage from "@/assets/img/7daysTrialCreative.webp";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export default function Trial7Days() {
  return (
    <section className="px-4 xl:px-40 py-8 xl:py-16 flex flex-col-reverse lg:flex-row justify-between items-center">
      <div className="lg:w-[45%] flex flex-col">
        <h3 className="font-old-standard text-3xl lg:text-4xl text-text-black text-center lg:text-left">
          Inicia con Nuestra Guía Gratuita y Conecta con Dios en 7 Días
        </h3>
        <p className="lg:text-xl my-4  text-text-black font-light text-center lg:text-left mb-8">
          Da el primer paso hacia una rutina espiritual constante con nuestra
          guía digital gratuita de 7 días. Diseñada para ayudarte a cultivar
          momentos diarios de conexión con Dios, sin importar cuán ocupada sea
          tu vida.
        </p>
        <div className="flex gap-4 items-center mb-2">
          <span className="flex justify-center items-center bg-primary rounded-full text-white p-1">
            <CheckIcon />
          </span>
          <p className="lg:text-xl text-text-black font-light text-center lg:text-left">
            Reflexiones diarias breves y profundas
          </p>
        </div>
        <div className="flex gap-4 items-center mb-2 ">
          <span className="flex justify-center items-center bg-primary rounded-full text-white p-1">
            <CheckIcon />
          </span>
          <p className="lg:text-xl text-text-black font-light text-center lg:text-left">
            Pasajes bíblicos cuidadosamente seleccionados
          </p>
        </div>
        <div className="flex gap-4 items-center mb-2">
          <span className="flex justify-center items-center bg-primary rounded-full text-white p-1">
            <CheckIcon />
          </span>
          <p className="lg:text-xl text-text-black font-light text-center lg:text-left">
            Preguntas reflexivas para profundizar
          </p>
        </div>
        <div className="flex gap-4 items-center mb-8">
          <span className="flex justify-center items-center bg-primary rounded-full text-white p-1">
            <CheckIcon />
          </span>
          <p className="lg:text-xl text-text-black font-light text-center lg:text-left">
            Calendario práctico para establecer constancia
          </p>
        </div>
        <button className="px-4 py-2 text-white bg-primary rounded mx-auto  lg:m-0 w-fit">
          Comienza 7 días gratis
        </button>
      </div>
      <div className="lg:w-1/2 flex justify-center items-center">
        <Image
          src={trialdaysImage}
          alt="Persona leyendo junto con vela"
          className="rounded-2xl w-10/12 mb-8 lg:m-0 h-auto lg:h-[600px] lg:w-auto "
        />
      </div>
    </section>
  );
}
