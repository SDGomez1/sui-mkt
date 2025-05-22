import Isologo from "@/assets/icons/Isologo";
import WaveDecoration from "@/assets/icons/WaveDecoration";
import EmailSignUpForm from "@/components/auth/EmailSignUpForm";
import GoogleSignInButton from "@/components/auth/GoogleButton";
import Navbar from "@/components/homePage/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function login() {
  return (
    <>
      <Navbar />
      <section className="h-[calc(100svh-5rem)] flex justify-center items-center overflow-x-hidden">
        <Card
          className={cn(
            "w-96 relative border-[0px] shadow-none lg:border lg:shadow-lg lg:border-neutral-200",
          )}
        >
          <WaveDecoration className="absolute -z-10 left-1/2 w-fit h-20 rotate-6 hidden lg:block opacity-5" />
          <WaveDecoration className="absolute -z-10 right-1/2 w-fit h-20 rotate-[190deg] bottom-0 hidden lg:block opacity-5" />
          <CardHeader>
            <Isologo className=" w-fit h-8 mb-6 hidden lg:block" />
            <CardTitle>Registrate</CardTitle>
            <CardDescription>
              Para acceder a todos nuestros servicios
            </CardDescription>
            <CardContent>
              <EmailSignUpForm />
            </CardContent>
            <CardFooter className="p-0 flex  items-center gap-2 mt-4">
              <p className="text-sm text-neutral-400">¿Ya tienes cuenta?</p>
              <Link
                href="/auth/login"
                className="text-sm text-blue-500 flex items-center justify-center hover:text-blue-700 transition-all group "
              >
                Iniciar sesión
                <ArrowRightIcon className="size-4 transition-all group-hover:ml-1" />
              </Link>
            </CardFooter>
          </CardHeader>
        </Card>
      </section>
    </>
  );
}
