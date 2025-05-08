import Footer from "@/components/homePage/Footer";
import ProductGallery from "./ProductGallery";

export default function Page() {
  return (
    <section className="overflow-x-hidden max-w-svw">
      <div className="flex px-4 xl:px-40 flex-col xl:flex-row justify-between py-8">
        <ProductGallery />
        <div className="lg: w-1/2">
          <h1 className="font-old-standard text-3xl text-primary">
            ¿HACE CUÁNTO NO LE DICES A MAMÁ LO QUE SIGNIFICA PARA TI?
          </h1>
          <p className="font-bold text-2xl mt-4 text-primary">$39.900</p>
          <p className="font-bold text-xl mt-4 ">
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

          <p className="text-xl mt-4">Con este kit lograras:</p>
          <ul className="text-xl">
            <li>✅ Que el regalo no solo guste, sino que toque el alma. </li>
            <li>✅ Que tu mensaje se sienta, no solo se lea.</li>
            <li>
              ✅ Que quien lo reciba te recuerde por cómo la hiciste sentir.
            </li>
          </ul>
          <p className="text-xl mt-4 font-bold">¿Quieres dar algo que no se olvide?</p>
          <p className=" mt-4 font-bold">Empieza por aquí.</p>
        </div>
      </div>

      <Footer />
    </section>
  );
}
