"use client";
import { ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCart, useClearCart } from "@/lib/queries/cart.query";
import { formatAsMoney } from "@/lib/utils";
import { Button } from "../ui/button";
export default function CartMenu() {
  const { data, error } = useCart();
  const { mutate } = useClearCart();

  const cartItems = data?.data?.items.map((item) => {
    return (
      <div
        className="flex w-full px-3  border-b border-b-neutral-200 py-3 select-none"
        key={item.productId}
      >
        <div className="flex flex-col text-sm w-1/2">
          <p className="font-medium">{item.name}</p>
          <p className="text-gray-500 font-light">{`$${formatAsMoney(item.price)}`}</p>
        </div>
        <div className="flex justify-end items-center w-1/2 gap-2">
          <div className="flex justify-center items-center w-full">
            <button className="border rounded-full size-5 flex justify-center items-center mr-4 border-neutral-400 cursor-pointer">
              -
            </button>
            <p className="text-sm font-medium">{item.quantity}</p>
            <button className="border rounded-full size-5 flex justify-center items-center ml-4 border-neutral-400 cursor-pointer">
              +
            </button>
          </div>
          <button className="cursor-pointer">
            <Trash2Icon className="size-4 text-destructive" />
          </button>
        </div>
      </div>
    );
  });

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer relative">
        <ShoppingCartIcon className="size-7 stroke-1 hover:stroke-2" />
        {data && data?.data?.items.length > 0 && (
          <span className="absolute size-4 font-medium flex justify-center items-center left-2/3 rounded-full bg-red-700 text-white text-xs -top-1/12">
            {data.data.totalItems}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="border-neutral-300 shadow p-0 mt-1"
      >
        <div className="w-full border-b border-b-neutral-200 p-3 font-medium ">
          <p>Carrito de compras</p>
        </div>
        {data && data?.data?.items.length > 0 ? (
          <>
            {cartItems}
            <div className="p-3 flex flex-col gap-4 select-none">
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  Total: ${formatAsMoney(data?.data.subtotal as number)}
                </p>
                <p
                  className="text-xs text-destructive select-none cursor-pointer"
                  onClick={() => mutate()}
                >
                  limpiar carrito
                </p>
              </div>
              <Button>Ir a pagar</Button>
            </div>
          </>
        ) : (
          <div className="justify-center flex items-center min-h-32 flex-col px-3 gap-2">
            <ShoppingCartIcon className="size-8 text-neutral-300" />
            <p className="text-neutral-300 select-none">Tu carrito esta vacio</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
