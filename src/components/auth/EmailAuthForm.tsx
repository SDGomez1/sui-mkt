"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setUserEmail } from "@/store/features/userData/userDataSlice";
import { useState } from "react";
import { LoadingSpinner } from "@/assets/icons/LoadingSpinner";

export default function EmailAuthForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    dispatch(setUserEmail(values.email));
    router.push("/auth/login/password");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-4">
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            "Continuar con el correo electronico"
          )}
        </Button>
      </form>
    </Form>
  );
}
const formSchema = z.object({
  email: z.string().email({ message: "Escribe un correo electrónico valido" }),
});
