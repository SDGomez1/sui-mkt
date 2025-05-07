"use client";
export default function FreeTrialForm() {
  return (
    <section className="flex justify-center items-center px-4 xl:px-40">
      <form className="lg:w-2/5 flex flex-col bg-[#F2F3FF] rounded-lg p-10 gap-4 ">
        <h4 className="font-old-standard text-3xl lg:text-4xl text-text-black text-center lg:text-left">
          Obtén tu Guía Gratuita
        </h4>
        <label>Nombre</label>
        <input className="border bg-white p-2" placeholder="Tu nombre" />
        <label>Correo</label>
        <input
          className="border bg-white p-2 mb-8"
          placeholder="Correo Electronico"
        />
        <button className="px-4 py-2 text-white bg-primary rounded mx-auto mb-8 lg:m-0 w-fit self-center">
          Descargar Guía
        </button>
      </form>
    </section>
  );
}
