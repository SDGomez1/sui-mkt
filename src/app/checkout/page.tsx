"use client";
import Isologo from "@/assets/icons/Isologo";
import composition from "@/assets/img/warmCompositionMadre.webp";
import Footer from "@/components/homePage/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [preferenceId, setPreferenceId] = useState("");
  const [isPayment, setIsPayment] = useState(false);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await fetch("/api/v1/preferenceId");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.id) {
          setPreferenceId(data.id);
        } else {
          console.warn("Preference ID not found in response data:", data);
        }
      } catch (err) {
        console.error("Failed to fetch preference ID:", err);
      }
    };

    fetchPreference();
  }, []);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
    mode: "onChange",
  });
  return (
    <section className="flex flex-col bg-linear-to-b from-white to-[#F2F3FF] min-h-svh">
      <Isologo className="size-20 self-center" />
      <h2 className="font-old-standard text-4xl text-primary self-center mb-4">
        Finaliza tu compra
      </h2>
      <div className="flex flex-col lg:flex-row lg:justify-between xl:px-40">
        <div className="border border-primary/40 shadow-lg mx-4 p-4 rounded bg-white mb-4 lg:w-[49%] shrink-0">
          <Form {...form}>
            <form
              className="flex flex-col  gap-4 mb-4"
              onSubmit={form.handleSubmit(
                async (data) => {
                  setIsPayment(true);
                },
                (error) => console.log(error),
              )}
            >
              <h3 className="font-old-standard text-2xl self-center text-primary mb-4">
                Información de envío
              </h3>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        disabled={isPayment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Perez"
                        {...field}
                        disabled={isPayment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ejemplo@ejemplo.com"
                        {...field}
                        disabled={isPayment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Telefono</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="3214567890"
                        {...field}
                        type="number"
                        disabled={isPayment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Calle A#B-C"
                        {...field}
                        disabled={isPayment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas adicionales (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="No quiero recibir guía gratis, quiero una carta ya escrita."
                        {...field}
                        disabled={isPayment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                className={`px-4 py-2 text-white bg-primary rounded mx-auto mb-8 lg:m-0 w-full hover:bg-primary-hover transition cursor-pointer disabled:bg-primary/50 disabled:cursor-default ${isPayment ? "hidden" : "block"} `}
                disabled={!form.formState.isValid}
              >
                Completar Pedido
              </button>
            </form>
          </Form>
          {isPayment && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}
        </div>
        <div className="border border-primary/40 shadow-lg mx-4 p-4 rounded bg-white mb-4">
          <h2 className="font-old-standard text-2xl text-primary self-center mb-4 text-center">
            Resumen del pedido
          </h2>
          <div className="flex justify-between gap-2 items-center mb-4">
            <Image
              src={composition}
              alt="imagen del producto"
              className="w-2/5 aspect-square rounded-xl"
            />
            <div className="lg:w-1/2 ">
              <p className="font-bold 2xl:text-xl">Regalo dia de la madre</p>
              <p className="text-sm text-gray-600 mb-2 2xl:text-lg">
                vela aromatizada de 200 gramos
              </p>
              <p className="text-sm mb-2 2xl:text-lg"> Cantidad: 1 $39.900</p>
              <p className="text-sm text-gray-600 2xl:text-lg">
                Gratis 1 Carta de bendición
              </p>
              <p className="text-sm text-gray-600 2xl:text-lg">
                Gratis 1 Guía para escribir
              </p>
            </div>
          </div>
          <Separator />
          <div className="py-4">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-600 2xl:text-lg">Subtotal:</p>
              <p className="text-sm 2xl:text-lg">$39.900</p>
            </div>
            <div className="flex justify-between ">
              <p className="text-sm text-gray-600  2xl:text-lg">Envio:</p>
              <p className="text-sm  2xl:text-lg font-bold">Gratis</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between pt-4">
            <p className="font-medium  2xl:text-lg">Total:</p>
            <p className="text-primary font-bold 2xl:text-lg">$39.900</p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Tu nombre de tener almenos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "Tu apellido de tener almenos 2 caracteres" }),
  email: z.string().email({ message: "Utiliza un email valido" }),
  phone: z.string().length(10, { message: "Utiliza un numero celular valido" }),
  address: z.string().min(4, { message: "Pon una dirección valida" }),
  notes: z.string().optional(),
});
