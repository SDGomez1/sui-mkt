import { auth } from "@/backend/services/auth/auth";
import { guestSessionService } from "@/backend/services/auth/guestSession";
import { cartService } from "@/backend/services/cart/cart";
import { guestCartService } from "@/backend/services/cart/guestCart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await auth.api.getSession({ headers: req.headers });
    const guestCartContext = await guestSessionService.getGuestContext();

    if (!user) {
      const cartSessionId =
        guestCartContext.id || (await guestSessionService.createGuestSession());

      const cartData = await guestCartService.getCart({
        type: "guest",
        id: cartSessionId,
      });

      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: cartData,
      });
    } else {
      const cartData = await cartService.getCart({
        type: "guest",
        id: user.user.id,
      });
      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: cartData,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to fetch carta data",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const user = await auth.api.getSession({ headers: req.headers });
    const guestCartContext = await guestSessionService.getGuestContext();

    if (!user) {
      const cartSessionId =
        guestCartContext.id || (await guestSessionService.createGuestSession());
      const cartData = await guestCartService.clearCart({
        type: "guest",
        id: cartSessionId,
      });
      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: cartData,
      });
    } else {
      const cartData = await cartService.clearCart({
        type: "guest",
        id: user.user.id,
      });
      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: cartData,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to clear cart data",
      },
      { status: 500 },
    );
  }
}
