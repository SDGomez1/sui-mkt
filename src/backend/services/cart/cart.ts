import prisma from "@/backend/db/prisma/prisma";

class CartService {
  async getCartbyUserId(userId: string) {
    return prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
          },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                featuredImage: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }
}

export const cartService = new CartService();
