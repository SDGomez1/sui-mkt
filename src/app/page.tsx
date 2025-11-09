import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import audio from "@/assets/img/audio.jpeg";
import oraciones from "@/assets/img/oraciones.jpeg";
import tarjetas from "@/assets/img/cards.jpeg";
import tcd from "@/assets/img/tcd.jpeg";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="text-center py-12 px-6 flex flex-col justify-center items-center gap-5 bg-primary">
        <h1 className="text-4xl md:text-5xl font-bold  text-white">
          Conecta con Dios
        </h1>
        <p className="mt-2 font-medium  bg-white py-2 rounded-full px-6">
          5 días donde{" "}
          <span className="text-destructive underline">
            experimentarás Su presencia{" "}
          </span>
          sin tener tiempo extra.
        </p>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white font-semibold">
          ¿Los devocionales hacen que te limites en conectar con Dios en vez de
          acercarte más a Él?
        </p>

        <video
          src={
            "https://051hypth9e.ufs.sh/f/8iuI0czMfynSaYhhohpgkJxd2ETi5FAOmqKpIX69bLhMul8G"
          }
          controls
          className="w-[80vw] lg:[w-60vw]"
        ></video>
        <Button className="text-3xl font-semibold text-center  bg-white text-primary py-8 px-8">
          Estoy lista
        </Button>
      </header>

      {/* Section: Qué obtienes */}
      <section className="bg-white py-12 px-6">
        <p className="text-center mt-4 font-semibold text-xl">
          Lo que vas a tener en estos 5 días:
        </p>

        <div className="mt-8 grid md:grid-cols-2  lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Audio guías",
              desc: "Para sentir la presencia de Dios cada día.",
              src: audio,
            },
            {
              title: "Oraciones diarias",
              desc: "Conecta con Él en medio de tu rutina.",
              src: oraciones,
            },
            {
              title: "Tarjetas de identidad",
              desc: "Refuerza tu identidad en Dios.",
              src: tarjetas,
            },
            {
              title: "Tiempo con Dios",
              desc: "Para un espacio de intimidad",
              src: tcd,
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="transition-all border-blue-200 border-none ring-none shadow-none hover:shadow-none"
            >
              <CardContent className="p-6 text-center">
                <Image
                  src={item.src}
                  className="mx-auto  w-auto mb-4 max-h-40 lg:max-h-none"
                  alt={item.title}
                />
                <h3 className="font-semibold text-lg mt-auto">{item.title}</h3>
                <p className=" mt-2">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section: Problema */}
      <section className="py-16  px-4 bg-primary">
        <p className="text-center mt-4 font-semibold text-xl text-white">
          Después de ayudar a más de 60 personas a conectar con Dios me di
          cuenta que la mayoría:{" "}
        </p>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white"></h2>
          <p className="mt-4 text-white"></p>
          <ul className="mt-4 text-white space-y-2">
            <li>• Corren con tanto trabajo que no pueden conectar con Él.</li>
            <li>
              • Necesitan una manera práctica de sentir Su presencia para
              descansar.
            </li>
            <li>• No pueden hacer devocionales largos.</li>
          </ul>
        </div>
      </section>

      {/* Section: Solución */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-lg italic font-semibold">
            Esa frustración de no encontrar un momento para Dios — no es tu
            culpa.
          </p>
          <p className="my-4 text-gray-700 font-semibold ">
            Solo estás buscando maneras de conectar con Él, sin tener en cuenta
            tu estilo de vida.
          </p>
          <Button className="text-3xl font-semibold text-center  bg-primary text-white py-8 px-8">
            Estoy lista
          </Button>

          <h2 className="mt-8 text-3xl font-bold ">¿Qué vas a lograr?</h2>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✨ Dejar tus cargas en Dios antes y después del trabajo.</li>
            <li>🙏 Mantenerte conectada a Dios en medio de tu rutina.</li>
            <li>
              🌿 Recordar Su palabra para fortalecer tu carácter espiritual.
            </li>
          </ul>
        </div>
      </section>

      {/* Section: Bonos */}
      <section className="py-16 bg-primary text-center">
        <h2 className="text-3xl font-bold text-white">
          ¡Conectar con Dios no debe ser complicado!
        </h2>
        <p className="mt-4 text-white">
          Mantén un espacio con Él sin sacar tiempo extra.
        </p>
        <p className="text-white">Disfruta tu rutina diaria con propósito.</p>
        <p className="text-lg text-white my-4 font-medium">
          ¡El secreto no es amoldar a Dios a tu vida, sino tu vida a Él!
        </p>

        <Button className="text-3xl font-semibold text-center  bg-white text-primary py-8 px-8">
          Estoy lista
        </Button>

        <div className="mt-10 max-w-3xl mx-auto px-4">
          <Card className="bg-white ">
            <CardContent className="p-6">
              <h3 className="text-destructive font-semibold text-lg">
                Bonos para las primeras 20 mujeres:
              </h3>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li className="flex gap-2">
                  <CheckIcon className="text-green-500 shrink-0" />
                  Ayuda personalizada adaptada a tu necesidad.
                </li>
                <li className="flex gap-2">
                  <CheckIcon className="text-green-500 shrink-0" />
                  📱 Devocionales en WhatsApp con otras mujeres.
                </li>
                <li className="flex gap-2">
                  <CheckIcon className="text-green-500 shrink-0" /> 🕯️ Una vela
                  simbólica: recuerda que Su luz siempre está contigo.
                </li>
              </ul>
              <p className="text-lg underline text-destructive mt-4">
                * Quedan 10 cupos
              </p>
            </CardContent>
          </Card>
        </div>
        <Button className="text-3xl font-semibold text-center  bg-white text-primary py-8 px-8 mt-6">
          Estoy lista
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-primary border-t border-white text-white text-center text-sm ">
        © 2025 Conecta con Dios — Creado por Sui
      </footer>
    </div>
  );
}
