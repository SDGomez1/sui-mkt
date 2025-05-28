import prisma from "@/backend/db/prisma/prisma";
import { cartService } from "../cart/cart";
import { z } from "zod";
import { CartContext } from "@/backend/types/cart.types";
import { guestCartService } from "../cart/guestCart";

export const createOrderInterface = z.object({
  userId: z.optional(z.string()),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  notes: z.optional(z.string()),
});

export type createOrderType = z.infer<typeof createOrderInterface>;
class OrderService {
  async createOrder(
    payload: createOrderType,
    isLogged: boolean,
    cartContext: CartContext,
  ) {
    if (!isLogged) {
      const cartData = await guestCartService.getCart(cartContext);
      if (!cartData || cartData.items.length <= 0) {
        throw new Error("Cannot create an order from an empty cart");
      }
      const orderItemsData: Array<{
        productId: string;
        quantity: number;
      }> = [];
      const createdOrderInDb = await prisma.$transaction(async (tx) => {
        for (const cartItem of cartData.items) {
          const product = await tx.product.findUnique({
            where: {
              id: cartItem.productId,
            },
          });
          if (!product) {
            throw new Error("Cannot create an order product not found");
          }
          if (product.stockQuantity < cartItem.quantity) {
            throw new Error("Cannot create an order product not enough stock");
          }

          await tx.product.update({
            where: { id: product.id },
            data: { stockQuantity: product.stockQuantity - cartItem.quantity },
          });
          orderItemsData.push({
            productId: product.id,
            quantity: cartItem.quantity,
          });
        }
        const newOrder = await tx.order.create({
          data: {
            userId: null,
            total: cartData.subtotal,
            billingFirstName: payload.firstName,
            billingLastName: payload.lastName,
            billingEmail: payload.email,
            billingPhone: payload.phone,
            billingAddress: payload.address,
            billingNotes: payload.notes,
            items: {
              create: orderItemsData.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: {
            items: {
              select: { productId: true, quantity: true },
            },
          },
        });
        return newOrder;
      });
      await guestCartService.clearCart(cartContext);
      return {
        orderId: createdOrderInDb.id,
        total: createdOrderInDb.total.toNumber(),
        createdAt: createdOrderInDb.createdAt.toISOString(),
        items: createdOrderInDb.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
    } else {
      const cartData = await cartService.getCart(cartContext);
      if (!cartData || cartData.items.length <= 0) {
        throw new Error("Cannot create an order from an empty cart");
      }
      const orderItemsData: Array<{
        productId: string;
        quantity: number;
      }> = [];
      const createdOrderInDb = await prisma.$transaction(async (tx) => {
        for (const cartItem of cartData.items) {
          const product = await tx.product.findUnique({
            where: {
              id: cartItem.productId,
            },
          });
          if (!product) {
            throw new Error("Cannot create an order product not found");
          }
          if (product.stockQuantity < cartItem.quantity) {
            throw new Error("Cannot create an order product not enough stock");
          }

          await tx.product.update({
            where: { id: product.id },
            data: { stockQuantity: product.stockQuantity - cartItem.quantity },
          });
          orderItemsData.push({
            productId: product.id,
            quantity: cartItem.quantity,
          });
        }
        const newOrder = await tx.order.create({
          data: {
            userId: cartContext.id,
            total: cartData.subtotal,
            billingFirstName: payload.firstName,
            billingLastName: payload.lastName,
            billingEmail: payload.email,
            billingPhone: payload.phone,
            billingAddress: payload.address,
            billingNotes: payload.notes,
            items: {
              create: orderItemsData.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: {
            items: {
              select: { productId: true, quantity: true },
            },
          },
        });
        return newOrder;
      });
      await cartService.clearCart(cartContext);
      return {
        orderId: createdOrderInDb.id,
        total: createdOrderInDb.total.toNumber(),
        createdAt: createdOrderInDb.createdAt.toISOString(),
        items: createdOrderInDb.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
    }
  }
}

export const orderService = new OrderService();
