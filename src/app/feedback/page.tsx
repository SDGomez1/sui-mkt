"use client";
import { useState } from "react";
import { Phone, Globe, Instagram } from "lucide-react";
import Isologo from "@/assets/icons/Isologo";
import WaveDecoration from "@/assets/icons/WaveDecoration";

interface FormData {
  likedMost: string;
  expectationsNotMet: string;
  improvementSuggestions: string;
  futureInclusions: string;
  receiveContent: boolean;
  email: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    likedMost: "",
    expectationsNotMet: "",
    improvementSuggestions: "",
    futureInclusions: "",
    receiveContent: false,
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    if (
      !formData.likedMost ||
      !formData.expectationsNotMet ||
      !formData.improvementSuggestions ||
      !formData.futureInclusions
    ) {
      setLoading(false);
      return;
    }

    if (formData.receiveContent && !formData.email) {
      setLoading(false);
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);

    // Reset form after submission
    setFormData({
      likedMost: "",
      expectationsNotMet: "",
      improvementSuggestions: "",
      futureInclusions: "",
      receiveContent: false,
      email: "",
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <section className=" p-10 flex flex-col  items-center justify-center min-h-svh ">
      {!submitted ? (
        <>
          <WaveDecoration className="absolute h-auto hidden xl:block w-6xl -z-10 opacity-20 top-1/4 left-1/12" />

          <h1 className="text-4xl font-bold md:text-5xl mb-4 font-old-standard text-primary">
            Queremos mejorar para ti!
          </h1>
          <p className="text-lg max-w-2xl text-gray-800">
            Cada respuesta nos ayuda a crear cosas que realmente acompañen tus
            momentos con Dios. Te pedimos que seas específico con tus
            respuestas. Sólo te tomará un par de minutos
            <span className="text-gold">✨✨</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-5">
            <div className="form-section flex flex-col">
              <label
                htmlFor="likedMost"
                className="font-bold text-lg mb-2 text-gray-800"
              >
                ¿Qué fue lo que más te gustó del producto?
              </label>
              <textarea
                id="likedMost"
                name="likedMost"
                value={formData.likedMost}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary/30 p-3 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-200 bg-white"
                placeholder="Cuéntanos lo que más valoraste..."
              />
            </div>

            <div className="form-section">
              <label
                htmlFor="expectationsNotMet"
                className="font-bold text-lg mb-2 text-gray-800"
              >
                ¿Hubo algo que no cumpliera tus expectativas?
              </label>
              <textarea
                id="expectationsNotMet"
                name="expectationsNotMet"
                value={formData.expectationsNotMet}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary/30 p-3 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-200 bg-white"
                placeholder="Tus comentarios nos ayudan a mejorar..."
              />
            </div>

            <div className="form-section">
              <label
                htmlFor="improvementSuggestions"
                className="font-bold text-lg mb-2 text-gray-800"
              >
                ¿Cómo podríamos mejorar la experiencia?
              </label>
              <textarea
                id="improvementSuggestions"
                name="improvementSuggestions"
                value={formData.improvementSuggestions}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary/30 p-3 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-200 bg-white"
                placeholder="Tus ideas son valiosas para nosotros..."
              />
            </div>

            <div className="form-section">
              <label
                htmlFor="futureInclusions"
                className="font-bold text-lg mb-2 text-gray-800"
              >
                ¿Qué te gustaría que incluyéramos o hiciéramos diferente la
                próxima vez?
              </label>
              <textarea
                id="futureInclusions"
                name="futureInclusions"
                value={formData.futureInclusions}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary/30 p-3 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-200 bg-white"
                placeholder="Ayúdanos a planear futuras mejoras..."
              />
            </div>

            <div className="form-section bg-primary/8 p-6 rounded-xl">
              <p className="form-question mb-4">
                ¿Te gustaría que te enviemos contenido especial que complemente
                tus momentos personales? (como música, frases, retos, o
                descuentos)
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="receiveContent"
                    value="yes"
                    checked={formData.receiveContent}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        receiveContent: true,
                      }));
                    }}
                    className="sr-only"
                  />
                  <span
                    className={`w-5 h-5 mr-2 rounded-full border ${
                      formData.receiveContent
                        ? "border-primary bg-primary"
                        : "border-gray-300 bg-white"
                    } flex items-center justify-center`}
                  >
                    {formData.receiveContent && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span>Sí, me encantaría</span>
                </label>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="receiveContent"
                    value="no"
                    checked={!formData.receiveContent}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        receiveContent: false,
                      }));
                    }}
                    className="sr-only"
                  />
                  <span
                    className={`w-5 h-5 mr-2 rounded-full border ${
                      !formData.receiveContent
                        ? "border-primary bg-primary"
                        : "border-gray-300 bg-white"
                    } flex items-center justify-center`}
                  >
                    {!formData.receiveContent && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span>No, gracias</span>
                </label>
              </div>

              {formData.receiveContent && (
                <div className="mt-4 transition-all duration-300 ease-in-out">
                  <label htmlFor="email" className="block text-lg mb-1">
                    Deja tu correo aquí!
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo:"
                    className="w-full rounded-lg border border-primary/30 p-3 text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-200 bg-white/80"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-8 py-3 rounded-full text-white font-medium 
                  transition-all duration-300 ease-in-out transform 
                  ${
                    loading
                      ? "bg-primary-dark/70 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg"
                  }
                `}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="py-16 text-center animate-fade-in">
          <div className="text-6xl mb-6">💜</div>
          <h2 className="text-2xl font-bold text-primary-dark mb-4">
            ¡Gracias por tu feedback!
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Gracias por ser parte de esta experiencia. Tu voz guía nuestro
            camino para seguir creando con propósito y amor ✨✨
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 text-primary hover:text-primary-dark underline"
          >
            {!loading ? "Enviar otro feedback" : "Enviando ... "}
          </button>
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-primary/20">
        <h3 className="text-xl font-semibold text-center  text-primary-dark mb-6">
          Estamos disponibles para ti!
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
          <a
            href="tel:3173914524"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Phone size={20} />
            <span>317 391 4524</span>
          </a>
          <a
            href="http://suivelas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Globe size={20} />
            <span>suivelas.com</span>
          </a>
          <a
            href="https://instagram.com/sui.velas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Instagram size={20} />
            <span>sui.velas</span>
          </a>
        </div>

        <Isologo className="size-24 mx-auto " />
      </div>
    </section>
  );
}
