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
import { useMutation } from "convex/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_KEY as string);
  const [preferenceId, setPreferenceId] = useState("");
  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("https://suivelas.com/api/v1/preferenceId");
      return await response.json();
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data && preferenceId == "") {
      setPreferenceId(data.id);
    }
  }, [data]);
  const createOrder = useMutation(api.order.createOrder);
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
              className="flex flex-col  gap-4 "
              onSubmit={form.handleSubmit(
                async (data) => {
                  const response = await createOrder({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    notes: data.notes,
                    product: "kit dia madres",
                  });
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
                      <Input placeholder="John" {...field} />
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
                      <Input placeholder="Perez" {...field} />
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
                      <Input placeholder="ejemplo@ejemplo.com" {...field} />
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
                      <Input placeholder="Calle A#B-C" {...field} />
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
                        placeholder="Intrucciones especiales para la entrega, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Wallet initialization={{ preferenceId: "" }} />
              <button>Completar Pedido</button>
            </form>
          </Form>
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
              <p className="text-sm  2xl:text-lg">gratis</p>
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
