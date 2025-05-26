import prisma from "@/backend/db/prisma/prisma";
import {
  CartContext,
  CartItem,
  GuestCartStorage,
} from "@/backend/types/cart.types";
import { productService } from "../product/product";
import { guestCartService } from "./guestCart";

class CartService {
  formatCartData(
    cartId: string,
    items: CartItem[],
    createdAt: Date,
    updatedAt: Date,
    userId?: string,
  ) {
    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return {
      cartId,
      userId,
      items,
      subtotal,
      totalItems,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }
  private async getCartbyUserId(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }
    return cart;
  }

  async getCart(context: CartContext) {
    const userCart = await this.getCartbyUserId(context.id);
    const cartItems: CartItem[] = userCart.items
      .filter((dbItem) => dbItem.product)
      .map((dbItem) => {
        const product = dbItem.product!;
        return {
          productId: dbItem.productId,
          name: product.name,
          price: product.price.toNumber(),
          quantity: dbItem.quantity,
          imageUrl: product.featuredImage,
          itemTotal: product.price.toNumber() * dbItem.quantity,
        };
      });

    return this.formatCartData(
      userCart.id,
      cartItems,
      userCart.createdAt,
      userCart.updatedAt,
      userCart.userId,
    );
  }

  async addItemToCart(
    context: CartContext,
    productId: string,
    quantity: number,
  ) {
    const userId = context.id;
    const productDetails = await productService.getProductById(productId);

    if (!productDetails) {
      throw new Error("Product not found");
    }
    if (productDetails.stockQuantity < quantity) {
      throw new Error("Not enough stock");
    }

    const cart = await this.getCartbyUserId(userId);

    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existingItem) {
      const productForStockCheck =
        await productService.getProductById(productId);
      if (
        !productForStockCheck ||
        productForStockCheck.stockQuantity < existingItem.quantity + quantity
      ) {
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    const newCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { updatedAt: new Date() },
    });
    return newCart;
  }

  async updateCartItem(
    context: CartContext,
    productId: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      return this.removeItemFromCart(context, productId);
    }

    const userId = context.id;
    const productDetails = await productService.getProductById(productId);

    if (!productDetails) {
      throw new Error("Product not found for update");
    }
    if (productDetails.stockQuantity < quantity) {
      throw new Error("Not enough stock for the new quantity");
    }

    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new Error("User cart not found. Cannot update item.");
    }

    const updatedItem = await prisma.cartItem.updateMany({
      where: { cartId: cart.id, productId: productId },
      data: { quantity: quantity },
    });

    if (updatedItem.count === 0) {
      throw new Error("Item not found in cart to update.");
    }

    const newCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { updatedAt: new Date() },
    });

    return newCart;
  }

  async removeItemFromCart(context: CartContext, productId: string) {
    const userId = context.id;
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return cart;
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });

    const newCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { updatedAt: new Date() },
    });
    return newCart;
  }

  async clearCart(context: CartContext) {
    const userId = context.id;
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      const newCart = await prisma.cart.update({
        where: { id: cart.id },
        data: { updatedAt: new Date() },
      });
      return newCart;
    }
  }
  async mergeGuestCartToUserCart(guestCartSessionId: string, userId: string) {
    const guestCartStore = await guestCartService.getCart({
      type: "guest",
      id: guestCartSessionId,
    });

    if (!guestCartStore || guestCartStore.items.length === 0) {
      return;
    }

    const userCart = await this.getCart({ type: "guest", id: userId });
    let userCartWasModified = false;

    for (const guestItem of guestCartStore.items) {
      const productDetails = await productService.getProductById(
        guestItem.productId,
      );

      if (!productDetails) {
        continue;
      }

      if (productDetails.stockQuantity < guestItem.quantity) {
        continue;
      }
      const existingUserCartItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: userCart.cartId,
            productId: guestItem.productId,
          },
        },
      });

      if (existingUserCartItem) {
        const totalDesiredQuantity =
          existingUserCartItem.quantity + guestItem.quantity;
        if (productDetails.stockQuantity < totalDesiredQuantity) {
          const quantityToAdd =
            productDetails.stockQuantity - existingUserCartItem.quantity;
          if (quantityToAdd > 0) {
            await prisma.cartItem.update({
              where: { id: existingUserCartItem.id },
              data: { quantity: existingUserCartItem.quantity + quantityToAdd },
            });
            userCartWasModified = true;
          }
        } else {
          await prisma.cartItem.update({
            where: { id: existingUserCartItem.id },
            data: { quantity: totalDesiredQuantity },
          });
          userCartWasModified = true;
        }
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.cartId,
            productId: guestItem.productId,
            quantity: guestItem.quantity,
          },
        });
        userCartWasModified = true;
      }
    }

    if (userCartWasModified) {
      await prisma.cart.update({
        where: { id: userCart.cartId },
        data: { updatedAt: new Date() },
      });
    }

    await guestCartService.clearCart({ type: "guest", id: guestCartSessionId });
  }
}

export const cartService = new CartService();
