"use client";

import { LoadingSpinner } from "@/assets/icons/LoadingSpinner";
import { useAddProductToCart } from "@/lib/queries/cart.query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuantitySelector({
  productId,
  fragranceId,
}: {
  productId: string;
  fragranceId: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync } = useAddProductToCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {" "}
      <div className="flex-col min-w-32">
        <div className="flex border p-2 justify-between border-neutral-300 text-xl">
          <button
            onClick={() => {
              const newQuant = quantity - 1;
              setQuantity(newQuant <= 0 ? 1 : newQuant);
            }}
            className="px-2 cursor-pointer"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <button
        className="cursor-pointer bg-primary py-2 px-4 text-white font-medium h-full flex  justify-center items-center gap-2"
        onClick={async () => {
          setIsLoading(true);
          const data = await mutateAsync({
            productId: productId,
            quantity: quantity,
            fragranceId,
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
    </>
  );
}
