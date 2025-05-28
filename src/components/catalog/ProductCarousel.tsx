"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useAllProducts } from "@/lib/queries/product.query";
import { useAddProductToCart } from "@/lib/queries/cart.query";
import { LoadingSpinner } from "@/assets/icons/LoadingSpinner";

export default function ProductCarousel() {
  const { data: productsData } = useAllProducts();
  const { mutate, isPending, variables, isSuccess } = useAddProductToCart();
  if (productsData) {
    const products = productsData.data.map((product) => {
      const isAdding = isPending && variables.productId === product.id;
      const isLoading = isAdding && !isSuccess;
      return (
        <div
          className="flex w-52 flex-col shrink-0 h-96 lg:w-80 lg:h-auto"
          key={product.id}
        >
          <Link
            href={`/products/${product.id}/${product.url}`}
          >
            <img
              className="w-full"
              src={product.featuredImage}
              alt=""
              width={208}
              height={208}
            />
            <h3 className="font-medium mt-3.5 lg:text-lg">{product.name}</h3>
            <p className="text-sm text-neutral-600 font-normal lg:text-base">
              {product.description}
            </p>
          </Link>
          <div className="mt-auto">
            <p className=" font-medium my-3 lg:text-lg">{`$${product.price}`}</p>
            <Button
              variant={"outline"}
              className="border-black rounded-none w-full cursor-pointer"
              onClick={() => {
                mutate({ productId: product.id, quantity: 1 });
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner className="text-black" />
              ) : (
                "Añadir al Carrito"
              )}
            </Button>
          </div>
        </div>
      );
    });
    return (
      <section className="font-bold px-6 mt-9 lg:px-40" id="products">
        <div className="flex justify-between mb-5">
          <h2 className="text-xl max-w-56 lg:max-w-full lg:text-2xl">
            Velas para tu intimidad con Dios
          </h2>
          <Link
            href={"/"}
            className="underline font-bold self-end text-sm lg:self-center lg:text-base"
          >
            Ver todas
          </Link>
        </div>
        <div className="overflow-x-auto flex gap-x-9 lg:gap-x-20 pr-6 ">
          {products}
        </div>
      </section>
    );
  }
  return (
    <section className="font-bold px-6 mt-9 lg:px-40" id="products">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl max-w-56 lg:max-w-full lg:text-2xl">
          Velas para tu intimidad con Dios
        </h2>
      </div>
      <div className="overflow-x-auto flex gap-x-9 lg:gap-x-20 pr-6 ">
        <div className="flex w-52 flex-col shrink-0 h-96 lg:w-80 lg:h-auto ">
          <div className="size-52 lg:size-80  bg-neutral-200 animate-pulse" />

          <p className="text-sm text-neutral-600 font-normal lg:text-base w-2/3 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
          <div className="mt-auto">
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-1/2 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-1/4 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-full bg-neutral-200 h-10 mt-2 animate-pulse"></p>
          </div>
        </div>
        <div className="flex w-52 flex-col shrink-0 h-96 lg:w-80 lg:h-auto ">
          <div className="size-52 lg:size-80  bg-neutral-200 animate-pulse" />

          <p className="text-sm text-neutral-600 font-normal lg:text-base w-2/3 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
          <div className="mt-auto">
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-1/2 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-1/4 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-full bg-neutral-200 h-10 mt-2 animate-pulse"></p>
          </div>
        </div>

        <div className="flex w-52 flex-col shrink-0 h-96 lg:w-80 lg:h-auto ">
          <div className="size-52 lg:size-80  bg-neutral-200 animate-pulse" />

          <p className="text-sm text-neutral-600 font-normal lg:text-base w-2/3 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
          <div className="mt-auto">
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-1/2 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-1/4 bg-neutral-200 h-8 mt-2 animate-pulse"></p>
            <p className="text-sm text-neutral-600 font-normal lg:text-base w-full bg-neutral-200 h-10 mt-2 animate-pulse"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
