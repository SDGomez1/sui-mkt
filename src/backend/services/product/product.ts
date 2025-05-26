import prisma from "@/backend/db/prisma/prisma";

class ProductService {
  async getProductById(productId: string) {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }
  async getAllProducts() {
    return prisma.product.findMany({
      select: {
        id: true,
        name: true,
        featuredImage: true,
        price: true,
        description: true,
      },
      take: 5,
    });
  }
}

export const productService = new ProductService();

