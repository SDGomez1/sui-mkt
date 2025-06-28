import prisma from "@/backend/db/prisma/prisma";
import {
  CartContext,
  CartItem,
  GuestCartStorage,
} from "@/backend/types/cart.types";
import { productService } from "../product/product";
import { guestCartService } from "./guestCart";
import { fragranceService } from "../fragrance/fragrance";

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
            fragrance: true,
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
              fragrance: true,
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
          fraganceId: dbItem.fragranceId,
          fraganceName: dbItem.fragrance.name,
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
    fragranceId: string,
  ) {
    const userId = context.id;
    const fragranceDetails =
      await fragranceService.getFragranceById(fragranceId);
    const productDetails = await productService.getProductById(productId);

    if (!fragranceDetails) {
      throw new Error("fragrance not found");
    }

    if (fragranceDetails.productId !== productId) {
      throw new Error("Fragrance does not belong to the specified product.");
    }

    if (!productDetails) {
      throw new Error("Product not found");
    }
    if (fragranceDetails.stockQuantity < quantity) {
      throw new Error(`Not enough stock for fragance ${fragranceDetails.name}`);
    }

    const cart = await this.getCartbyUserId(userId);

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_fragranceId: {
          cartId: cart.id,
          productId,
          fragranceId,
        },
      },
    });

    if (existingItem) {
      const totalDesiredQuantity = existingItem.quantity + quantity;
      if (fragranceDetails.stockQuantity < totalDesiredQuantity) {
        throw new Error(
          `Not enough stock for fragrance: ${fragranceDetails.name}. Available: ${fragranceDetails.stockQuantity}, current in cart: ${existingItem.quantity}, desired add: ${quantity}`,
        );
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id }, // Update by ID of the specific cart item
        data: { quantity: totalDesiredQuantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          fragranceId,
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
    fragranceId: string,
  ) {
    if (quantity <= 0) {
      return this.removeItemFromCart(context, productId, fragranceId);
    }

    const userId = context.id;

    const fragranceDetails =
      await fragranceService.getFragranceById(fragranceId);

    if (!fragranceDetails) {
      throw new Error("Fragrance not found for update");
    }
    if (fragranceDetails.productId !== productId) {
      throw new Error("Fragrance does not belong to the specified product.");
    }
    if (fragranceDetails.stockQuantity < quantity) {
      throw new Error(
        `Not enough stock for the new quantity of fragrance: ${fragranceDetails.name}. Available: ${fragranceDetails.stockQuantity}`,
      );
    }
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      throw new Error("User cart not found. Cannot update item.");
    }

    const updatedItem = await prisma.cartItem.updateMany({
      where: {
        cartId: cart.id,
        productId: productId,
        fragranceId: fragranceId,
      },
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

  async removeItemFromCart(
    context: CartContext,
    productId: string,
    fragranceId: string,
  ) {
    const userId = context.id;
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return cart;
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId, fragranceId: fragranceId },
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

      const fragranceDetails = await fragranceService.getFragranceById(
        guestItem.fraganceId,
      );

      if (!productDetails) {
        continue;
      }
      if (!fragranceDetails) {
        continue;
      }

      if (fragranceDetails.stockQuantity < guestItem.quantity) {
        continue;
      }
      const existingUserCartItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId_fragranceId: {
            cartId: userCart.cartId,
            productId: guestItem.productId,
            fragranceId: guestItem.fraganceId,
          },
        },
      });

      if (existingUserCartItem) {
        const totalDesiredQuantity =
          existingUserCartItem.quantity + guestItem.quantity;
        if (fragranceDetails.stockQuantity < totalDesiredQuantity) {
          const quantityToAdd =
            fragranceDetails.stockQuantity - existingUserCartItem.quantity;
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
            fragranceId: guestItem.fraganceId,
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
