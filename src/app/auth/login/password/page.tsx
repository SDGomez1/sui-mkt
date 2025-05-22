import Isologo from "@/assets/icons/Isologo";
import WaveDecoration from "@/assets/icons/WaveDecoration";
import PasswordLogin from "@/components/auth/PasswordLogin";
import UserEmailSet from "@/components/auth/UserEmailSet";
import Navbar from "@/components/homePage/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
            <CardTitle>Inicia sesión</CardTitle>
            <CardDescription>Continua a Sui</CardDescription>
            <CardContent>
              <UserEmailSet />
              <PasswordLogin />
            </CardContent>
          </CardHeader>
        </Card>
      </section>
    </>
  );
}
