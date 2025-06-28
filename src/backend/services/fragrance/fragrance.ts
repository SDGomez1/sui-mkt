import prisma from "@/backend/db/prisma/prisma";

class FragranceService {
  async getFragranceById(fragranceId: string) {
    return prisma.fragrance.findUnique({
      where: { id: fragranceId },
    });
  }
  async getFragranceByProductAndFragranceId(
    productId: string,
    fragranceId: string,
  ) {
    return prisma.fragrance.findFirst({
      where: {
        id: fragranceId,
        productId: productId,
      },
    });
  }
}

export const fragranceService = new FragranceService();
