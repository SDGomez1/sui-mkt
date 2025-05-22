"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setUserEmail } from "@/store/features/userData/userDataSlice";
import { useState } from "react";
import { LoadingSpinner } from "@/assets/icons/LoadingSpinner";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function PasswordLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const userEmail = useAppSelector((state) => state.userData.email);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorPassword(false);
    const { data, error } = await authClient.signIn.email({
      email: userEmail,
      password: values.password,
      rememberMe: true,
    });
    if (data?.user) {
      router.replace("/");
    } else {
      console.log(error);
      setErrorPassword(true);
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder=""
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormDescription
                className={cn(
                  `text-destructive`,
                  errorPassword ? "block" : "hidden",
                )}
              >
                Contraseña incorrecta
              </FormDescription>
              <FormMessage />
              <FormDescription>
                <Link
                  href={""}
                  className="text-blue-500 hover:underline hover:text-blue-700"
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
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
  password: z.string().min(1, { message: "Escribe tu contraseña" }),
});
