import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGOKEY as string,
});

export interface productItems {
    id: string;
    title: string;
    quantity: number;
    unit_price: number
}

export async function createPreference(items: productItems[]) {
  const preference = new Preference(client);

  const preferenceId = await preference.create({
    body: {
      items: items,
      back_urls: {
        success: "https://suivelas.com/thankyou",
        failure: "http://suivelas.com",
        pending: "http://suivelas.com",
      },
      auto_return: "approved",
    },
  });
  return preferenceId;
}
