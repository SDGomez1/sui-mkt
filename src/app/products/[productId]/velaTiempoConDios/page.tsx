import Navbar from "@/components/homePage/Navbar";
import Image from "next/image";
import { CheckIcon, Flame } from "lucide-react";
import Footer from "@/components/homePage/Footer";
import QuantitySelector from "@/components/products/QuantitySelector";
import { productService } from "@/backend/services/product/product";
import BuyNowButton from "@/components/products/BuyNowButton";
import { formatAsMoney } from "@/lib/utils";
import { redirect } from "next/dist/client/components/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const productData = await productService.getProductById(productId);

  if (!productData) {
    redirect("/");
  }

  return (
    <section>
      <Navbar></Navbar>
      <div className=" px-6 lg:px-32 flex justify-center pt-24 flex-col lg:flex-row">
        <div className="justify-center lg:w-[48%] shrink-0 flex items-center max-h-[500px] flex-col">
          <Image
            src={productData?.featuredImage as string}
            alt=""
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,data:image/webp;base64,UklGRroCAABXRUJQVlA4WAoAAAAgAAAAUQAAUQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggzAAAABAHAJ0BKlIAUgA+7W6rUC09LaKp1dwroB2JZwZwDPlAnin+CrK5vZ1d5+LNpbT/2EeUtUdFRmsJ52tCDMUP9iwAAP7rbf51a3snekJiFTCG9X5DnqfQJC2N6J8sbrfnAcTGNRLd/YZY8w0oxODP6GiROB3sK0gPaQOAAhwmV0bpZXoUN8ZcP+wb2XzCBgIC6XBkLkvRGUAr02bWeD++Brm594INS7IGzt53Ntb47REZU+gXac8VMHbdWHC/xxeXTlVvhcAMBWlaAAAAAA=="
          />
          <p className="text-sm text-center mt-4">
            <span className="text-destructive font-bold">* </span>Imagen de
            referencia. los detalles pueden variar al ser una vela artesanal
          </p>
        </div>
        <div className="lg:w-[48%] mt-10 lg:mt-0 ">
          <h1 className="font-old-standard text-4xl font-medium mb-4">
            Vela tiempo con Dios
          </h1>
          <p>
            Una Experiencia Guiada de 30 Días para Construir una Relación Íntima
            y Duradera con Dios.
          </p>
          <div className="mt-4 flex items-center gap-4 text-lg">
            <p className="font-bold text-neutral-500 line-through">$55,000 </p>
            <p className="font-bold">
              ${formatAsMoney(Number(productData.price))}
            </p>
          </div>
          <p className="mb-4 text-sm font-medium">
            Tamaño de la vela: <span className="text-neutral-600">200g</span>
          </p>
          <p>
            No necesitas más fuerza de voluntad; necesitas un mejor sistema.
            Hemos creado una experiencia completa y guiada para que tú logres
            eliminar la fricción y la frustración de no pasar tu tiempo a solas
            con Dios.
          </p>
          <p className="font-medium mt-4">cantidad:</p>
          <div className="flex items-center gap-4">
            <QuantitySelector productId={productId} />
          </div>
        </div>
      </div>
      <div className=" px-6 lg:px-40">
        <h2 className="text-2xl font-medium mt-8 mb-2">Tu vela incluye:</h2>
        <ul className=" text-sm space-y-4">
          <li className="flex gap-2 ">
            <Flame className="text-[#B6D5F0] size-10 fill-[#B6D5F0] shrink-0" />
            <p>
              Acceso exclusivo a un calendario de 30 Días: La ruta diaria para
              lograr una relación constante con Dios y construir un hábito
              consistente. No es solo un calendario. Es un manual de
              entrenamiento para la autosuficiencia espiritual.
            </p>
          </li>
          <li className="flex gap-2 ">
            <Flame className="text-[#B6D5F0] size-10 fill-[#B6D5F0]" />
            <p>
              Playlist Seleccionada: Un simple código QR en la vela te da acceso
              inmediato a música que silencia el ruido exterior y enfoca tu
              corazón en Dios.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-medium mt-8 mb-2">¿Para quién es?</h2>
        <p className="mb-4">
          Esto es para el creyente que sabe que hay más en su relación con Dios,
          pero se siente estancado en un ciclo constante de empezar y abandonar.
        </p>
        <p className="mb-4">
          Sin este sistema, permaneces en el mismo lugar deseando tener
          consistencia, sintiéndote culpable cuando te saltas un día y dudando
          si tus oraciones son realmente efectivas.
        </p>
        <p className="mb-4">
          Pero con este sistema{" "}
          <span className="font-bold">
            te conviertes en una persona de alto valor espiritual{" "}
          </span>
          y te transformas en alguien que:
        </p>

        <ul className="space-y-4">
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>Camina con confianza en su fe.</p>
          </li>
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>
              Ya no depende de un pastor o un libro para conectar con Dios,
              porque ha{" "}
              <span className="font-medium">
                desarrollado la habilidad por sí mismo.
              </span>
            </p>
          </li>
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>
              Tiene una paz y sabiduría que los demás notan y a la que se
              sienten atraídos.
            </p>
          </li>
        </ul>
        <p className="mt-4">
          Pasarás de sentirte insuficiente en tu fe a ser una fuente de
          fortaleza y aliento para ti y los demás.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-2">Tus próximos 30 días</h2>
        <p className="mb-4">
          Piensa en el último año. ¿Cuántas veces te has prometido ser más
          consistente en la oración, solo para que la vida se interponga? Ese
          sentimiento de no dar la talla termina ya mismo.
        </p>
        <p className="mb-4">
          <span className="font-bold">Tu Futuro Con Este Sistema: </span>
          Imagina en 30 días. Te despiertas con emoción para encontrarte con
          Dios. <span className="font-bold">Tienes un proceso claro y repetible.</span> Puedes escuchar Su voz con más claridad. Tendrás un historial
          probado de la fidelidad de Dios y un fundamento espiritual inquebrantable.{" "}
          <span className="font-bold">Habrás construido el hábito más
          importante de tu vida.</span>
        </p>
        <p className="mb-4">
          Pero Si No Actúas: Los próximos 30 días serán iguales a los
          anteriores. La misma lucha por la consistencia, el mismo deseo de una
          conexión más profunda que parece fuera de tu alcance. Y probablemente
          estarás exactamente en el mismo lugar, todavía deseando un cambio.
        </p>

        <h2 className="text-2xl font-medium mt-8 mb-2">Resultados que Obtendrás:</h2>
        <ul className="space-y-4">
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>
              <span className="font-bold">Autosuficiencia Espiritual:</span>
              diriges tu propio tiempo con Dios de forma poderosa, sin
              necesitar una guía para siempre.
            </p>
          </li>
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>
              <span className="font-bold">Consistencia:</span> Forja un hábito
              de oración diario que perdura.
            </p>
          </li>
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>
              <span className="font-bold">Intimidad Más Profunda:</span> Logras
              una relación genuina y conversacional con Dios.
            </p>
          </li>
          <li className="flex gap-2 ">
            <span className="bg-green-400 text-sm p-1 rounded-full text-primary font-bold size-7 flex justify-center items-center">
              <CheckIcon className="text-white" />
            </span>
            <p>
              <span className="font-bold">Transformación Duradera:</span>
              Construye un fundamento espiritual que impacta cada área de tu
              vida.
            </p>
          </li>
        </ul>
        <p className="text-center font-bold text-lg mt-8 mb-4">
          Deja de Desear. Empieza a Construir. Obtén Tu Experiencia Guiada Hoy!.
        </p>
        <BuyNowButton productId={productId} className="w-1/2 mx-auto my-10" />
      </div>
      <Footer />
    </section>
  );
}
