"use client";
import TextLogo from "@/assets/icons/TextLogo";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: userData, isPending } = authClient.useSession();
  return (
    <nav className="px-4 lg:px-8 xl:px-40 flex justify-between items-center border-b border-b-primary/30 shadow  py-4 lg:h-20">
      <div className="flex justify-center items-center">
        <Link href="/">
          <TextLogo className="w-auto h-11" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2 lg:hidden">
        <UserIcon className="size-7 text-neutral-500" />
        <ShoppingCartIcon className="size-7 text-neutral-500" />
      </div>
      <div className="hidden lg:flex justify-center items-center gap-4">
        {isPending ? (
          <div className="bg-gray-300 animate-pulse h-9 w-32 rounded-md"></div>
        ) : (
          <>
            {userData?.user ? (
              <>
                <Button onClick={() => authClient.signOut()} className="min-w-32">
                  {userData.user.name}
                </Button>
              </>
            ) : (
              <>
                <Link href={"/auth/login"} className={buttonVariants()}>
                  Inicia sesión
                </Link>
                <Link
                  href={"/auth/signUp"}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Crea tu cuenta
                </Link>
              </>
            )}
          </>
        )}

        <Link
          href={"/cart"}
          className={cn(
            buttonVariants({ size: "icon", variant: "ghost" }),
            "p-0 [&_svg]:size-6",
          )}
        >
          <ShoppingCartIcon className="text-neutral-500" />
        </Link>
      </div>
    </nav>
  );
}
