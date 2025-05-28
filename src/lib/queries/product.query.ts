import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const AllProductResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.string(),
      featuredImage: z.string(),
      url: z.string(),
    }),
  ),
});

export const fetchAllProducts = async () => {
  const response = await fetch("/api/v1/products");
  const data = await response.json();
  return AllProductResponse.parse(data);
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    refetchOnWindowFocus: false,
  });
};
