import { productItems } from "@/backend/services/mercadopago/checkoutPro";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const getPreferenceId = async (data: productItems[]) => {
  const response = await fetch("/api/v1/preferenceId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return response.json();
};

export const useGetPreferenceId = () => {
  return useMutation({
    mutationFn: async (x: productItems[]) => await getPreferenceId(x),
  });
};
