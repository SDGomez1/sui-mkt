import { createPreference } from "@/backend/services/mercadopago/checkoutPro";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function POST(request: NextRequest) {
  const requestSchema = z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      quantity: z.number(),
      unit_price: z.number(),
    }),
  );

  const requestData = await request.json();
  const preferenceOptions = requestSchema.safeParse(requestData);

  if (!preferenceOptions.success) {
    return NextResponse.json(
      {
        sucess: false,
        message: "not valid options",
      },
      { status: 400 },
    );
  }

  try {
    const preference = await createPreference(preferenceOptions.data);

    return NextResponse.json({
      sucess: true,
      message: "preference created",
      data: preference.id,
    });
  } catch (error) {
    console.error("Error in createPreference API route:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      {
        sucess: false,
        message: "Failed to create preference",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
