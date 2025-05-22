import { createPreference } from "@/backend/services/mercadopago/checkoutPro";
import { type NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const preference = await createPreference();

    return NextResponse.json({
      sucess: true,
      id: preference.id,
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
