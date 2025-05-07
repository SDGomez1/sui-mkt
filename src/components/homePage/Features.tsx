export default function Features() {
  return (
    <section className="px-4 xl:px-40 py-8 xl:py-16 bg-[#F2F3FF]">
      <h3 className="font-old-standard text-3xl lg:text-4xl text-text-black text-center">
        Más que Velas, una Guía para tu Alma
      </h3>
      <p className="lg:text-xl my-4  text-text-black font-light text-center">
        Hemos creado experiencias espirituales estructuradas que combinan guías
        diarias con aromas intencionales para ayudarte a establecer momentos de
        conexión significativa con Dios. Nuestro enfoque único fusiona la
        práctica espiritual con rituales sensoriales, creando un espacio sagrado
        en medio de tu rutina diaria
      </p>
      <div className="flex flex-col gap-8 items-center justify-center text-text-black lg:flex-row lg:mt-8">
        <div className="bg-white w-full lg:w-[30%] flex shadow-lg flex-col p-8 items-center gap-4 lg:h-60">
          <span className="bg-[#F2F3FF] rounded-full text-primary font-bold size-10 flex justify-center items-center ">
            1
          </span>
          <h4 className="text-lg font-old-standard font-bold">
            Estructura simple
          </h4>
          <p className="text-center">
            Guías diarias diseñadas para integrarse fácilmente en tu vida
            cotidiana.
          </p>
        </div>
        <div className="bg-white w-full lg:w-[30%] shadow-lg flex flex-col p-8 items-center gap-4 xl:h-60">
          <span className="bg-[#F2F3FF] rounded-full text-primary font-bold size-10 flex justify-center items-center">
            2
          </span>
          <h4 className="text-lg font-old-standard font-bold">
            Aromas intencionales
          </h4>
          <p className="text-center">
            Velas artesanales que crean un ambiente propicio para la conexión
            espiritual.
          </p>
        </div>
        <div className="bg-white w-full lg:w-[30%] flex flex-col shadow-lg p-8 items-center gap-4 xl:h-60">
          <span className="bg-[#F2F3FF] rounded-full text-primary font-bold size-10 flex justify-center items-center">
            3
          </span>
          <h4 className="text-lg font-old-standard font-bold">
            Transformación Gradual
          </h4>
          <p className="text-center">
            Resultados que profundizan tu relación con Dios, un día a la vez.
          </p>
        </div>
      </div>
    </section>
  );
}
