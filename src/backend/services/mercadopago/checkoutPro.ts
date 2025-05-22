import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGOKEY as string,
});

export async function createPreference() {
  const preference = new Preference(client);

  const preferenceId = await preference.create({
    body: {
      items: [
        {
          id: "1",
          title: "kit dia madres",
          quantity: 1,
          unit_price: 39900,
        },
      ],
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
