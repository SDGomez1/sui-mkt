import {
  CartContext,
  CartItem,
  GuestCartStorage,
} from "@/backend/types/cart.types";
import { redis } from "@/backend/db/redis/redis";
import { productService } from "../product/product";

class GuestCartService {
  private GUEST_CART_EXPIRY_SECONDS = 24 * 60 * 60 * 14;

  private formatCartDataFromStorage(
    guestCartId: string,
    storage: GuestCartStorage | null,
  ) {
    const items: CartItem[] =
      storage?.items.map((item) => ({
        ...item,
        itemTotal: item.price * item.quantity,
      })) || [];

    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      cartId: guestCartId,
      items,
      subtotal,
      totalItems,
      createdAt: storage?.createdAt || new Date().toISOString(),
      updatedAt: storage?.updatedAt || new Date().toISOString(),
    };
  }

  private async getCartStorage(guestCartId: string) {
    try {
      return await redis.get<GuestCartStorage>(`guest_card:${guestCartId}`);
    } catch (e) {
      console.log(e);
    }
  }
  private async saveCartStorage(
    guestCartId: string,
    storage: GuestCartStorage,
  ) {
    storage.updatedAt = new Date().toISOString();
    if (!storage.createdAt) {
      storage.createdAt = storage.updatedAt;
    }
    try {
      await redis.set(`guest_card:${guestCartId}`, storage, {
        ex: this.GUEST_CART_EXPIRY_SECONDS,
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async deleteCartStorage(guestCartId: string) {
    try {
      await redis.del(`guest_card:${guestCartId}`);
    } catch (e) {
      console.log(e);
    }
  }

  async getCart(context: CartContext) {
    const guestCartStore = await this.getCartStorage(context.id);
    if (!guestCartStore) {
      return null;
    }
    return this.formatCartDataFromStorage(context.id, guestCartStore);
  }

  async addItemToGuestCart(
    context: CartContext,
    productId: string,
    quantity: number,
  ) {
    const productDetails = await productService.getProductById(productId);
    if (!productDetails) {
      throw new Error("Product not found");
    }
    if (productDetails.stockQuantity < quantity) {
      throw new Error("not enough stock");
    }

    const currentPrice = productDetails.price.toNumber();
    const guestCartStore = (await this.getCartStorage(context.id)) || {
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const existingItemIndex = guestCartStore.items.findIndex(
      (item) => item.productId === productId,
    );
    if (existingItemIndex > -1) {
      guestCartStore.items[existingItemIndex].quantity += quantity;
    } else {
      guestCartStore.items.push({
        productId,
        quantity,
        price: currentPrice,
        name: productDetails.name,
        imageUrl: productDetails.featuredImage,
      });
    }
    await this.saveCartStorage(context.id, guestCartStore);
    return this.formatCartDataFromStorage(context.id, guestCartStore);
  }

  async removeItemFromCart(context: CartContext, productId: string) {
    const guestCartStore = await this.getCartStorage(context.id);
    if (!guestCartStore) {
      return this.formatCartDataFromStorage(context.id, null);
    }

    guestCartStore.items = guestCartStore.items.filter(
      (item) => item.productId !== productId,
    );
    await this.saveCartStorage(context.id, guestCartStore);
    return this.formatCartDataFromStorage(context.id, guestCartStore);
  }

  async updateCartItem(
    context: CartContext,
    productId: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      return this.removeItemFromCart(context, productId); // Or throw error
    }
    const productDetails = await productService.getProductById(productId);
    if (!productDetails) {
      throw new Error("Product not found for update");
    }
    if (productDetails.stockQuantity < quantity) {
      throw new Error("Not enough stock for updated quantity");
    }

    const guestCartStore = await this.getCartStorage(context.id);
    if (!guestCartStore) throw new Error("Guest cart not found for update");

    const itemIndex = guestCartStore.items.findIndex(
      (item) => item.productId === productId,
    );
    if (itemIndex === -1) throw new Error("Item not in guest cart for update");

    guestCartStore.items[itemIndex].quantity = quantity;
    await this.saveCartStorage(context.id, guestCartStore);
    return this.formatCartDataFromStorage(context.id, guestCartStore);
  }

  async clearCart(context: CartContext) {
    await this.deleteCartStorage(context.id);
    return this.formatCartDataFromStorage(context.id, null);
  }
}

export const guestCartService = new GuestCartService();
