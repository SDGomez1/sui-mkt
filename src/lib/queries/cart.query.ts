import {
  QueryCache,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import z from "zod";

const cartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
  itemTotal: z.number().int().positive(),
  imageUrl: z.string(),
});

const cartSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    cartId: z.string(),
    items: z.array(cartItemSchema),
    subtotal: z.number(),
    totalItems: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

const fetchCart = async () => {
  const response = await fetch("/api/v1/cart");
  const data = await response.json();
  return cartSchema.parse(data);
};

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    refetchOnWindowFocus: false,
  });
};

const addProductToCartRequest = async (productId: string, quantity: number) => {
  const response = await fetch("/api/v1/cart/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: "include",
  });

  return response.json();
};

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (x: { productId: string; quantity: number }) =>
      addProductToCartRequest(x.productId, x.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

const clearCartRequest = async () => {
  const response = await fetch("/api/v1/cart/items", {
    method: "DELETE",
    credentials: "include",
  });

  return response.json();
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCartRequest,

    onSettled: () => {
      queryClient.setQueryData(["cart"], (old: unknown) => {
        return { success: true, message: "Cart data sucess", data: null };
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
