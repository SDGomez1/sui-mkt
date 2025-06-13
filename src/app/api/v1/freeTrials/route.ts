import { auth } from "@/backend/services/auth/auth";
import { freeTrialService } from "@/backend/services/freeTrialService/freeTrialService";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const BodyRequesScheme = z.object({
    productId: z.string().length(21),
    name: z.string().min(2),
    phone: z.string().length(10),
    address: z.string().min(2),
    notes: z.string().min(2),
  });
  const user = await auth.api.getSession({ headers: req.headers });
  if (!user || !user.user.id) {
    return NextResponse.json(
      {
        success: false,
        message: "Not authorized",
      },
      { status: 401 },
    );
  }

  const body = await req.json();
  const filteredBody = BodyRequesScheme.safeParse(body);
  if (!filteredBody.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Not able to validate the payload data",
      },
      { status: 400 },
    );
  }
  try {
    const result = await freeTrialService.createFreeTrial(
      user.user.id,
      filteredBody.data.productId,
      filteredBody.data.name,
      filteredBody.data.phone,
      filteredBody.data.address,
      filteredBody.data.notes,
    );

    return NextResponse.json({
      success: true,
      message: "freetrial created successfully",
      data: result,
    });
  } catch (e) {
    throw new Error(`${e}`);
  }
}
