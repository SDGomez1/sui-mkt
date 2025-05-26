"use client";
import { GoogleIcon } from "@/assets/icons/GoogleIcon";
import { LoadingSpinner } from "@/assets/icons/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function GoogleButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className={cn(
        "flex w-full justify-center items-center gap-3 py-2 px-4 rounded-3xl border border-[#747775]  font-medium font-roboto cursor-pointer hover:border-[#C1D5F6] hover:shadow transition text-sm disabled:text-gray-500 disabled:hover:shadows-none disabled:hover:border-[#747775] disabled:hover:cursor-auto",
        className,
      )}
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        const a = await authClient.signIn.social({ provider: "google" });
        if (a.data || a.error) {
          setIsLoading(false);
        }
      }}
    >
      {isLoading && <LoadingSpinner className="text-neutral-500" />}
      <GoogleIcon className="size-5" />
      Acceder con Google
    </button>
  );
}
