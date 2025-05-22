"use client";
import { GoogleIcon } from "@/assets/icons/GoogleIcon";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function GoogleButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      className={cn(
        "flex w-full justify-center items-center gap-3 py-2 px-4 rounded-3xl border border-[#747775] m-2 font-medium font-roboto cursor-pointer hover:border-[#C1D5F6] hover:shadow transition text-sm",
        className,
      )}
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        authClient.signIn.social({ provider: "google" });
      }}
    >
      <GoogleIcon className="size-5" />
      Acceder con Google
    </button>
  );
}
