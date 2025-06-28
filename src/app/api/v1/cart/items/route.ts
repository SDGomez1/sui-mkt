import { auth } from "@/backend/services/auth/auth";
import { guestSessionService } from "@/backend/services/auth/guestSession";
import { cartService } from "@/backend/services/cart/cart";
import { guestCartService } from "@/backend/services/cart/guestCart";
import { CartContext } from "@/backend/types/cart.types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const addCartRequestSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    fragranceId: z.string(),
  });
  try {
    const user = await auth.api.getSession({ headers: req.headers });
    const guestCartContext = await guestSessionService.getGuestContext();

    const requestData = await req.json();

    const filteredData = addCartRequestSchema.safeParse(requestData);
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
      const data = await guestCartService.addItemToGuestCart(
        context,
        filteredData.data.productId,
        filteredData.data.quantity,
        filteredData.data.fragranceId,
      );

      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: data,
      });
    } else {
      const data = await cartService.addItemToCart(
        { type: "guest", id: user.user.id },
        filteredData.data.productId,
        filteredData.data.quantity,
        filteredData.data.fragranceId,
      );
      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: data,
      });
    }
  } catch (e) {
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to add cart data",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const RequestSchema = z.object({
    productId: z.string(),
    fragranceId: z.string(),
  });
  try {
    const user = await auth.api.getSession({ headers: req.headers });
    const guestCartContext = await guestSessionService.getGuestContext();

    const requestData = await req.json();

    const filteredData = RequestSchema.safeParse(requestData);
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
      const data = await guestCartService.removeItemFromCart(
        context,
        filteredData.data.productId,
      );

      return NextResponse.json({
        success: true,
        message: "item removed sucess",
        data: data,
      });
    } else {
      const data = await cartService.removeItemFromCart(
        { type: "guest", id: user.user.id },
        filteredData.data.productId,
        filteredData.data.fragranceId,
      );
      return NextResponse.json({
        success: true,
        message: "item removed sucess",
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to remove from cart data",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const addCartRequestSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    fragranceId: z.string(),
  });
  try {
    const user = await auth.api.getSession({ headers: req.headers });
    const guestCartContext = await guestSessionService.getGuestContext();

    const requestData = await req.json();

    const filteredData = addCartRequestSchema.safeParse(requestData);
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
      const data = await guestCartService.updateCartItem(
        context,
        filteredData.data.productId,
        filteredData.data.quantity,
        filteredData.data.fragranceId,
      );

      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: data,
      });
    } else {
      const data = await cartService.updateCartItem(
        { type: "guest", id: user.user.id },
        filteredData.data.productId,
        filteredData.data.quantity,
        filteredData.data.fragranceId,
      );
      return NextResponse.json({
        success: true,
        message: "cart data sucess",
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to add cart data",
      },
      { status: 500 },
    );
  }
}
