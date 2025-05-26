"use client"
import TextLogo from "@/assets/icons/TextLogo";
import { MenuIcon , UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import CartMenu from "./CartMenu";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  return (
    <nav className="px-6 lg:px-8 xl:px-40 h-20 flex justify-between items-center border-b border-b-primary/30 shadow z-50 fixed w-full bg-white">
      <div className="flex justify-start items-center w-20">
        <Link href="/" className="hidden lg:block">
          <TextLogo className="w-auto h-11" />
        </Link>
        <MenuIcon className="lg:hidden" />
      </div>
      <div className="lg:hidden w-20">
        <Link href="/">
          <TextLogo className="w-auto h-11" />
        </Link>
      </div>
      <div className="flex justify-end items-center gap-2 w-20 lg:w-auto">
        <Button
          variant={"outline"}
          className="text-primary bg-white border-primary mr-8 hidden lg:block  hover:text-[#292F7F]"
        >
          Empieza gratis
        </Button>
        <CartMenu />
        <UserIcon className="size-7 stroke-1" onClick={() => authClient.signOut()}/>
      </div>
    </nav>
  );
}
