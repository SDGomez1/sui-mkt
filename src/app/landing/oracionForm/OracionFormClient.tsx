"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ctaClassName =
  "h-auto w-full rounded-2xl bg-[#585ca6] px-8 text-base font-semibold text-white shadow-[0_16px_30px_-18px_rgba(88,92,166,0.8)] transition hover:bg-[#4f5398]";

const triggerClassName =
  "mt-2 h-12 w-full justify-between rounded-xl border-0 bg-[#e0e0e0] px-4 text-sm font-semibold text-[#2a2e53] shadow-inner hover:bg-[#d8d8d8]";

const prayerFrequencyOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "todo el tiempo", label: "todo el tiempo" },
  { value: "nunca", label: "nunca" },
  { value: "de vez en cuando", label: "de vez en cuando" },
] as const;

const christianOptions = [
  { value: "si", label: "si" },
  { value: "no", label: "no" },
] as const;

const prayerDifficultyOptions = [
  { value: "Acercarme a Dios como soy", label: "Acercarme a Dios como soy" },
  { value: "Distracciones", label: "Distracciones" },
  { value: "la constancia", label: "la constancia" },
  { value: "no saber que decir", label: "no saber que decir" },
  { value: "no tengo tiempo", label: "no tengo tiempo" },
  { value: "siento que Dios está lejos", label: "siento que Dios está lejos" },
  { value: "siento culpa", label: "siento culpa" },
] as const;

const prayerGoalOptions = [
  { value: "volver a estar cerca de Él", label: "volver a estar cerca de Él" },
  { value: "sentir paz en mi vida", label: "sentir paz en mi vida" },
  { value: "ser constante en oración", label: "ser constante en oración" },
  { value: "Tener dirección", label: "Tener dirección" },
  { value: "dejar de sentirme sola(o)", label: "dejar de sentirme sola(o)" },
  { value: "sentir que Dios me escucha", label: "sentir que Dios me escucha" },
  {
    value: "aprender a soltar mis cargas",
    label: "aprender a soltar mis cargas",
  },
  {
    value: "volver a orar sin sentir culpa",
    label: "volver a orar sin sentir culpa",
  },
] as const;

const formSchema = z
  .object({
    firstName: z.string().min(1, "Ingresa tu nombre."),
    lastName: z.string().min(1, "Ingresa tus apellidos."),
    email: z.string().email("Ingresa un email válido."),
    countryCode: z.enum(["+52", "+57"], {
      required_error: "Selecciona un código de país.",
    }),
    phone: z
      .string()
      .min(5, "Ingresa un número válido.")
      .regex(/^[0-9]+$/, "Solo números."),
    prayerFrequency: z.string().min(1, "Selecciona una opción."),
    isChristian: z.enum(["si", "no"]).optional(),
    prayerDifficulty: z.string().min(1, "Selecciona una opción."),
    prayerGoal: z.string().min(1, "Selecciona una opción."),
  })
  .superRefine((value, context) => {
    if (!value.isChristian) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecciona una opción.",
        path: ["isChristian"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const getSelectedLabel = (
  options: { value: string; label: string }[],
  value: string | undefined,
  placeholder: string,
) => {
  if (!value) return placeholder;
  return options.find((option) => option.value === value)?.label ?? value;
};

const disclaimerText =
  "Al proporcionar tu información, aceptas que podamos contactarte por teléfono, mensaje de texto o correo electrónico utilizando los datos que nos proporcionaste, incluso si tu número se encuentra registrado en una lista de “No llamar”. No vendemos ni compartimos tu información personal con terceros. Al enviar tu información, aceptas nuestra Política de Privacidad y Términos de Servicio.";

export function OracionFormClient() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+57",
      phone: "",
      prayerFrequency: "",
      isChristian: undefined,
      prayerDifficulty: "",
      prayerGoal: "",
    },
    mode: "onTouched",
  });

  const handleNext = async () => {
    if (step === 1) {
      const valid = await form.trigger(["firstName", "lastName"]);
      if (!valid) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      const valid = await form.trigger(["email"]);
      if (!valid) return;
      setStep(3);
      return;
    }
    if (step === 3) {
      const valid = await form.trigger(["countryCode", "phone"]);
      if (!valid) return;
      setStep(4);
    }
  };

  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/oracionForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error enviando el formulario");
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-3xl px-6 py-12 text-center sm:px-8">
        <h2 className="text-3xl font-bold text-[#1d2142] sm:text-4xl">
          ¡Revisa tu email para ver tu guía!
        </h2>
        <p className="mt-4 text-base font-semibold text-[#2a2e53] sm:text-lg">
          ¡Todo listo! Tu guía de oración ya fue enviada a tu correo.
        </p>
        <p className="mt-3 text-sm text-[#2a2e53]">
          Revisa tu carpeta de spam si no ves el correo.
        </p>
        <p className="mt-16 text-base text-[#2a2e53] sm:text-lg">
          Descárgala para comenzar tu tiempo con Dios hoy.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          className={cn("w-full max-w-2xl border-0 bg-white/90 shadow-none")}
        >
          <div className="space-y-8 px-6 sm:px-8">
            <div className="rounded-2xl bg-white p-6 sm:p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#1d2142] sm:text-[1.9rem]">
                  Desarrolla una vida de oración
                </h2>
              </div>

              <div className="mt-6 flex justify-center">
                <ul className="w-full max-w-xs space-y-4 text-left">
                  {[
                    "Ten intimidad con Dios",
                    "Entrega cargas a Dios",
                    "Busca a Dios con intención",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-5 shrink-0 text-[#585ca6]"
                        strokeWidth={2.25}
                      />
                      <p className="text-base text-[#2a2e53]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-center text-sm font-semibold text-[#2a2e53]">
                Puede ser tuya en solo 30 segundos.
              </p>

              <div className="mt-6">
                {step === 1 && (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-[#1c2043]">
                        ¿Cuál es tu nombre?
                      </p>
                    </div>

                    <div className="mt-5 space-y-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="PRIMER NOMBRE"
                                {...field}
                                className="h-12 rounded-xl border-transparent bg-[#e4e4e4] text-center text-sm font-semibold text-[#2a2e53] placeholder:text-[#8b8b8b] focus-visible:ring-[#585ca6]"
                              />
                            </FormControl>
                            <FormMessage className="text-center" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="APELLIDOS"
                                {...field}
                                className="h-12 rounded-xl border-transparent bg-[#e4e4e4] text-center text-sm font-semibold text-[#2a2e53] placeholder:text-[#8b8b8b] focus-visible:ring-[#585ca6]"
                              />
                            </FormControl>
                            <FormMessage className="text-center" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <Button
                        type="button"
                        className={ctaClassName}
                        onClick={handleNext}
                      >
                        Empecemos
                      </Button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="text-lg font-semibold text-[#1c2043]">
                      ¿A cuál email deberiamos enviarla?
                    </h3>
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="EMAIL PERSONAL"
                                {...field}
                                className="h-12 rounded-xl border-transparent bg-[#f1f0fb] text-sm font-semibold text-[#2a2e53] placeholder:text-[#8b8b8b] focus-visible:ring-[#585ca6]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-6">
                      <Button
                        type="button"
                        className={ctaClassName}
                        onClick={handleNext}
                      >
                        Continuar
                      </Button>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm font-semibold text-[#2a2e53] transition hover:text-[#585ca6]"
                      >
                        {"<-"} Ir atrás
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h3 className="text-lg font-semibold text-[#1c2043]">
                      ¿Cuál es tu numero de celular?
                    </h3>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-xs font-semibold text-[#6b6f97]">
                              Código país
                            </FormLabel>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    className={triggerClassName}
                                  >
                                    {getSelectedLabel(
                                      [
                                        { value: "+52", label: "México (+52)" },
                                        {
                                          value: "+57",
                                          label: "Colombia (+57)",
                                        },
                                      ],
                                      field.value,
                                      "Selecciona una opción",
                                    )}
                                    <ChevronDown className="size-4 text-[#2a2e53]" />
                                  </Button>
                                </FormControl>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-[#d0cfe6] bg-white">
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <DropdownMenuRadioItem value="+52">
                                    México (+52)
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="+57">
                                    Colombia (+57)
                                  </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-[2]">
                            <FormLabel className="text-xs font-semibold text-[#6b6f97]">
                              Número
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Tu número"
                                {...field}
                                className="mt-2 h-12 rounded-xl border-transparent bg-[#f1f0fb] text-sm font-semibold text-[#2a2e53] placeholder:text-[#8b8b8b] focus-visible:ring-[#585ca6]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-6">
                      <Button
                        type="button"
                        className={ctaClassName}
                        onClick={handleNext}
                      >
                        Continuar
                      </Button>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm font-semibold text-[#2a2e53] transition hover:text-[#585ca6]"
                      >
                        {"<-"} Ir atrás
                      </button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h3 className="text-lg font-semibold text-[#1c2043]">
                      ¿En qué fase te encuentras en tu{" "}
                      <span className="font-bold">relación con Dios</span>?
                    </h3>

                    <div className="mt-6 space-y-6">
                      <FormField
                        control={form.control}
                        name="prayerFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#2a2e53]">
                              Veces que oras en el día
                            </FormLabel>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    className={triggerClassName}
                                  >
                                    {getSelectedLabel(
                                      [...prayerFrequencyOptions],
                                      field.value,
                                      "Selecciona una opción",
                                    )}
                                    <ChevronDown className="size-4 text-[#2a2e53]" />
                                  </Button>
                                </FormControl>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-[#d0cfe6] bg-white">
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  {prayerFrequencyOptions.map((option) => (
                                    <DropdownMenuRadioItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isChristian"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#2a2e53]">
                              ¿Eres cristiana(o)?
                            </FormLabel>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    className={triggerClassName}
                                  >
                                    {getSelectedLabel(
                                      [...christianOptions],
                                      field.value,
                                      "Selecciona una opción",
                                    )}
                                    <ChevronDown className="size-4 text-[#2a2e53]" />
                                  </Button>
                                </FormControl>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-[#d0cfe6] bg-white">
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  {christianOptions.map((option) => (
                                    <DropdownMenuRadioItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="prayerDifficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#2a2e53]">
                              ¿Qué es lo que más te cuesta al orar?
                            </FormLabel>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    className={triggerClassName}
                                  >
                                    {getSelectedLabel(
                                      [...prayerDifficultyOptions],
                                      field.value,
                                      "Selecciona una opción",
                                    )}
                                    <ChevronDown className="size-4 text-[#2a2e53]" />
                                  </Button>
                                </FormControl>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-[#d0cfe6] bg-white">
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  {prayerDifficultyOptions.map((option) => (
                                    <DropdownMenuRadioItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="prayerGoal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#2a2e53]">
                              ¿Qué quieres lograr en tu relación con Dios?
                            </FormLabel>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    className={triggerClassName}
                                  >
                                    {getSelectedLabel(
                                      [...prayerGoalOptions],
                                      field.value,
                                      "Selecciona una opción",
                                    )}
                                    <ChevronDown className="size-4 text-[#2a2e53]" />
                                  </Button>
                                </FormControl>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] border-[#d0cfe6] bg-white">
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  {prayerGoalOptions.map((option) => (
                                    <DropdownMenuRadioItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <Button type="submit" className={ctaClassName}>
                        Tener mi guía
                      </Button>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm font-semibold text-[#2a2e53] transition hover:text-[#585ca6]"
                      >
                        {"<-"} Ir atrás
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="pt-2 text-center">
          <p className="mx-auto mt-6 max-w-xl px-4 text-xs leading-5 text-[#66699b]">
            {disclaimerText}{" "}
            <Link
              href="/politica_privacidad.pdf"
              className="font-semibold text-[#585ca6] transition hover:text-[#4f5398]"
            >
              Política de Privacidad
            </Link>{" "}
            y{" "}
            <Link
              href="/TyC.pdf"
              className="font-semibold text-[#585ca6] transition hover:text-[#4f5398]"
            >
              Términos y Condiciones
            </Link>
            .
          </p>
        </div>
      </form>
    </Form>
  );
}
