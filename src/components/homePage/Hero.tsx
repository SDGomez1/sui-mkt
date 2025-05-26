import heroImage from "@/assets/img/sui landing.jpg";

import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="w-full flex flex-col lg:flex-row justify-between items-center bg-[#F9F9F7] h-auto pt-8 mt-20 lg:px-40 lg:pt-0 2xl:justify-center 2xl:gap-40">
      <div className="flex-col flex lg:w-[520px]">
        <div className="flex flex-col px-6 ">
          <h1 className="font-old-standard text-3xl lg:text-4xl text-text-black lg:text-left font-bold">
            Cultiva tu Conexión con <span className="text-primary">Dios </span>
            Día a Día con nosotros
          </h1>
          <h2 className="lg:text-xl mt-4 mb-5 text-text-black font-light lg:text-left">
            Descubre nuestras guías y velas con aromas, diseñadas para ayudarte
            a crear momentos íntimos con Dios
          </h2>
        </div>
        <div className="flex gap-4 justify-start items-center w-full mb-4 px-6">
          <Button className="lg:text-base">Nuestras velas</Button>
          <Button
            variant={"outline"}
            className="text-primary bg-[#F9F9F7] border-primary hover:text-[#292F7F] lg:text-base"
          >
            Empieza gratis
          </Button>
        </div>
      </div>
      <div className="lg:w-[450px] aspect-square lg:h-auto 2xl:w-[600px]">
        <Image src={heroImage} alt="Persona leyendo junto con vela" />
      </div>
    </section>
  );
}
