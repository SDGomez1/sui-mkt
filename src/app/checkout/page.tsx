"use client";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import Navbar from "@/components/homePage/Navbar";
import { useCart } from "@/lib/queries/cart.query";
import { formatAsMoney } from "@/lib/utils";
import { useGetPreferenceId } from "@/lib/queries/checkout.query";
import { productItems } from "@/backend/services/mercadopago/checkoutPro";

export default function Page() {
  const [preferenceId, setPreferenceId] = useState("");
  const [isPayment, setIsPayment] = useState(false);

  const { data: cartData } = useCart();
  const { mutateAsync: getPreferenceId } = useGetPreferenceId();

  const cartItems = cartData?.data.items.map((item) => {
    return (
      <div className="flex gap-7 items-center mb-4" key={item.productId}>
        <img
          src={item.imageUrl}
          alt="imagen del producto"
          className="size-20 "
        />
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-neutral-500">Catidad: {item.quantity}</p>
          <p className="text-neutral-500">
            precio unitario: ${formatAsMoney(item.price)}
          </p>
        </div>
      </div>
    );
  });

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
  console.log(preferenceId);
  return (
    <section className="flex flex-col min-h-svh">
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:justify-between xl:px-40 mt-20 py-10">
        <div className="border border-primary/40 shadow-lg mx-4 p-4 rounded bg-white mb-4 lg:w-[49%] shrink-0">
          <Form {...form}>
            <form
              className="flex flex-col  gap-4 mb-4"
              onSubmit={form.handleSubmit(
                async (data) => {
                  if (!cartData) {
                    return;
                  }
                  const formattedCartItems = cartData.data.items.map((item) => {
                    return {
                      id: item.productId,
                      title: item.name,
                      quantity: item.quantity,
                      unit_price: item.price,
                    };
                  });
                  const prefId = await getPreferenceId(formattedCartItems);
                  if (!prefId.sucess) {
                    return;
                  } else {
                    setPreferenceId(prefId.data);
                    setIsPayment(true);
                  }
                },
                (error) => console.log(error),
              )}
            >
              <h3 className="font-old-standard text-2xl self-center font-medium mb-4">
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
                disabled={!form.formState.isValid || !cartData}
              >
                Completar Pedido
              </button>
            </form>
          </Form>
          {isPayment && preferenceId !== "" && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}
        </div>
        <div className="border border-primary/40 shadow-lg mx-4 p-4 rounded bg-white mb-4 lg:w-full">
          <h2 className="font-old-standard text-2xl font-medium self-center mb-4 text-center">
            Resumen del pedido
          </h2>
          {cartItems}
          <Separator />
          <div className="py-4">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-600 2xl:text-lg">Subtotal:</p>
              <p className="text-sm 2xl:text-lg">
                $
                {formatAsMoney(
                  cartData?.data.subtotal ? cartData.data.subtotal : 0,
                )}
              </p>
            </div>
            <div className="flex justify-between ">
              <p className="text-sm text-gray-600  2xl:text-lg">Envio:</p>
              <p className="text-sm  2xl:text-lg font-bold">Gratis</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between pt-4">
            <p className="font-medium  2xl:text-lg">Total:</p>
            <p className="text-primary font-bold 2xl:text-lg">
              $
              {formatAsMoney(
                cartData?.data.subtotal ? cartData.data.subtotal : 0,
              )}
            </p>
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
