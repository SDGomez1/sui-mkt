import heroImage from "@/assets/img/HeroImage.webp";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="w-full px-4 lg:px-8  xl:px-40 flex flex-col lg:flex-row justify-between items-center bg-[#F2F3FF] h-auto py-8">
      <div className="lg:w-[45%] flex flex-col">
        <h1 className="font-old-standard text-3xl lg:text-4xl text-text-black text-center lg:text-left">
          Cultiva tu Conexión con <span className="text-primary">Dios </span>Día
          a Día con nosotros
        </h1>
        <h2 className="lg:text-xl mt-4 mb-12 text-text-black font-light text-center lg:text-left">
          Descubre nuestras guías y velas con aromas, diseñadas para ayudarte a
          crear momentos íntimos con Dios
        </h2>

        <button className="px-4 py-2 text-white bg-primary rounded mx-auto mb-8 lg:m-0 w-fit">
          Comienza 7 días gratis
        </button>
      </div>
      <div className="lg:w-1/2">
        <Image src={heroImage} alt="Persona leyendo junto con vela" className="rounded-2xl"/>
      </div>
    </section>
  );
}
