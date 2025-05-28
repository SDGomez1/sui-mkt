import { auth } from "@/backend/services/auth/auth";
import { guestSessionService } from "@/backend/services/auth/guestSession";
import {
  createOrderInterface,
  orderService,
} from "@/backend/services/order/order";
import { CartContext } from "@/backend/types/cart.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await auth.api.getSession({ headers: req.headers });
    const guestCartContext = await guestSessionService.getGuestContext();

    const requestData = await req.json();

    const filteredData = createOrderInterface.safeParse(requestData);
    if (!filteredData.success || !filteredData.data) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos requeridos",
        },
        { status: 400 },
      );
    }

    if (!user) {
      const cartSessionId =
        guestCartContext.id || (await guestSessionService.createGuestSession());
      const context: CartContext = { type: "guest", id: cartSessionId };
      const data = await orderService.createOrder(
        filteredData.data,
        false,
        context,
      );

      return NextResponse.json({
        success: true,
        message: "Order created sucessfully",
        data: data,
      });
    } else {
      const context: CartContext = { type: "guest", id: user.user.id };
      const data = await orderService.createOrder(
        filteredData.data,
        true,
        context,
      );
      return NextResponse.json({
        success: true,
        message: "Order created sucessfully",
        data: data,
      });
    }
  } catch (e) {
        console.log(e)
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to create order",
      },
      { status: 500 },
    );
  }
}
