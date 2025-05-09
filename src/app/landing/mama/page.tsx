import Image from "next/image";
import hero1 from "@/assets/img/firstMotherImage.webp";
import hero2 from "@/assets/img/warmCompositionMadre.webp";
import hero3 from "@/assets/img/secondMotherImage.webp";
import Link from "next/link";
import Footer from "@/components/homePage/Footer";

export default function Page() {
  return (
    <section>
      <div className="px-6 pt-4 text-center xl:px-40">
        <h1 className="text-primary font-bold text-lg mb-4 lg:text-4xl lg:mb-10">
          ¿Cansado de Regalos que Terminan en un Cajón?
        </h1>
        <p className="lg:text-xl">Conoce nuestro Kit:</p>
        <p className="mb-4 lg:text-xl">
          <span className="font-bold">Una vela</span> +{" "}
          <span className="font-bold">bendición </span>+{" "}
          <span className="font-bold">carta de tu amor </span>La respuesta de
          darle a mamá un regalo que realmente usará para recordarle cuánto la
          amas.
        </p>
        <Image
          src={hero1}
          alt="Mama feliz con su regalo"
          className="w-full max-w-[800px] mx-auto"
        />
        <Link href="/checkout" className="cursor-pointer">
          <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold flex justify-center items-center px-1 py-2 text-sm rounded shadow-lg my-4 lg:text-xl transition cursor-pointer">
            Quiero Regalarle Momentos Inolvidables
          </button>
        </Link>
        <h2 className="text-primary font-bold text-lg mb-4 lg:text-3xl">
          ¿Te Suena Familiar el Ciclo del Regalo {'"Por Cumplir"'}?
        </h2>
        <p className="mb-4 lg:text-xl">
          Año tras año, buscas ese regalo perfecto para mamá. Quieres expresarle
          todo tu amor y gratitud, pero a veces... las opciones parecen
          impersonales, o terminan siendo algo que ella agradece con cortesía,
          pero que no conecta profundamente con su corazón ni con su día a día.
        </p>
        <p className="mb-4 font-bold lg:text-xl">El resultado:</p>
        <p className="mb-4 lg:text-xl">
          Otro objeto bonito guardado, y esa sensación de que podrías haberle
          dado algo con mucho más significado.
        </p>
        <h2 className="text-primary font-bold text-lg mb-4 font-old-standard lg:text-4xl">
          Este Día de la Madre, Transforma Tu Intención en Su Experiencia Más
          Preciada.
        </h2>
        <Image
          src={hero2}
          alt="Mama feliz con su regalo"
          className="w-full max-w-[800px] mx-auto"
        />
        <p className="mt-4 font-bold lg:text-xl">Imagina esto:</p>
        <p className="mb-4 lg:text-xl">
          Mamá enciende una vela con un suave aroma a vainilla, creando un
          ambiente de calma instantánea. Toma en sus manos una tarjeta, no una
          cualquiera, sino una donde <span className="font-bold">TÚ </span>has
          volcado tus sentimientos más sinceros. Y mientras el aroma la
          envuelve, lee una poderosa bendición de Proverbios 31,{" "}
          <span className="font-bold">
            recordándole su fuerza, su valor y el amor
          </span>{" "}
          incondicional que la rodea.
        </p>
        <h2 className="text-primary font-bold text-lg mb-4 lg:text-3xl">
          Nuestro kit no es solo un regalo, es una experiencia diseñada para que
          mamá:
        </h2>
        <ul className="space-y-4 text-left lg:text-xl">
          <li>
            🕯️
            <span className="font-bold">
              Cree un Momento Sagrado para Ella:
            </span>{" "}
            La vela de vainilla no solo ilumina, sino que invita a la pausa y a
            la serenidad en su día ajetreado.
          </li>
          <li>
            💌
            <span className="font-bold">
              Sienta Tu Amor Más Profundo, Cada Día:
            </span>{" "}
            La tarjeta personalizada se convierte en un tesoro que puede releer,
            sintiendo tu abrazo y tus palabras sinceras una y otra vez.
          </li>
          <li>
            💖
            <span className="font-bold">
              Se Sienta Bendecida y Fortalecida:
            </span>{" "}
            La bendición de Proverbios 31:25-29 es un recordatorio de su
            increíble valía y la gracia que la acompaña.
          </li>
        </ul>
        <Link href="/checkout" className="cursor-pointer">
          <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold flex justify-center items-center px-1 py-2 text-sm rounded shadow-lg my-4 lg:text-xl transition cursor-pointer">
            Quiero comprar
          </button>
        </Link>
        <h2 className="text-primary font-bold text-lg mb-4 lg:text-3xl">
          Más Que Un Regalo: Una Declaración de Cuánto Te Importa.
        </h2>
        <p className="mb-4 font-bold text-left lg:text-xl">Para ti:</p>
        <ul className="space-y-4 text-left mb-4 lg:text-xl">
          <li>
            ✅<span className="font-bold">Di Adiós al Estrés:</span> Deja de
            buscar y preocuparte. Has encontrado un regalo único, pensado y
            lleno de significado
          </li>
          <li>
            🌟
            <span className="font-bold">
              Conviértete en el Héroe del Día de la Madre:
            </span>{" "}
            Imagina la sonrisa de mamá, sus ojos iluminados. Este es el tipo de
            regalo que genera conversaciones, el que te hace destacar por tu
            consideración.
          </li>
          <li>
            💖
            <span className="font-bold">La Certeza de Acertar:</span> No es un
            regalo más, es una experiencia de amor y bienestar que ella valorará
            profundamente.
          </li>
        </ul>
        <Image
          src={hero3}
          alt="Mama feliz con su regalo"
          className=" w-full max-w-[800px] mx-auto"
        />
        <Link href="/checkout" className="cursor-pointer">
          <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold flex justify-center items-center px-1 py-2 text-sm rounded shadow-lg my-4 lg:text-xl transition cursor-pointer">
            Quiero dárselo a mamá
          </button>
        </Link>
      </div>
      <Footer />
    </section>
  );
}
