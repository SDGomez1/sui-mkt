"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";

export default function UserMenu() {
  const { data, isPending } = authClient.useSession();
  if (isPending) {
    return <div className="size-7 bg-gray-400 animate-pulse rounded-md" />;
  }
  if (!data) {
    return (
      <Link href={"/auth/login"}>
        <UserIcon className="size-7 stroke-1 hover:stroke-2" />
      </Link>
    );
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="cursor-pointer">
        <UserIcon className="size-7 stroke-1 hover:stroke-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-neutral-300 mt-1 min-w-52" align="end">
                <div className="flex gap-4 w-full p-2 ">
                    <span className="flex justify-center items-center bg-primary text-white size-8 rounded-full shrink-0">{data.user.name.at(0)}</span>
                    <div className="w-full">
                        <p className="text-sm font-medium">{data.user.name}</p>
                        <p className="text-xs text-neutral-500">{data.user.email}</p>

                    </div>
                </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const data = await authClient.signOut();
            if (data.data?.success) {
              toast("Sesion cerrada con exito");
            }
          }}
          className="cursor-pointer text-destructive"
        >
                    <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
