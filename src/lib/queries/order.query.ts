import { createOrderType } from "@/backend/services/order/order";
import { useMutation } from "@tanstack/react-query";

const requestCreateOrder = async (data: createOrderType) => {
  const response = await fetch("/api/v1/checkout/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return response.json();
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (x: createOrderType) => await requestCreateOrder(x),
  });
};
