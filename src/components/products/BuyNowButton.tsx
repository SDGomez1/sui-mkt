"use client";

import { LoadingSpinner } from "@/assets/icons/LoadingSpinner";
import { useAddProductToCart } from "@/lib/queries/cart.query";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BuyNowButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { mutateAsync } = useAddProductToCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className={cn(
        "cursor-pointer bg-primary py-2 px-4 text-white font-medium h-full flex  justify-center items-center gap-2",
        className,
      )}
      onClick={async () => {
        setIsLoading(true);
        const data = await mutateAsync({
          productId: productId,
          quantity: 1,
        });
        if (data.success) {
          router.push("/checkout");
          setIsLoading(false);
        }
      }}
      disabled={isLoading}
    >
      {isLoading && <LoadingSpinner />}
      Compra ahora
    </button>
  );
}
