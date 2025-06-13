import prisma from "@/backend/db/prisma/prisma";

class FreeTrialService {
  async createFreeTrial(
    userId: string,
    productId: string,
    name: string,
    phone: string,
    address: string,
    notes: string,
  ) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.productType !== "TRIAL") {
      throw new Error("The product is not a free trial product");
    }

    const exisitingFreeTrial = await prisma.userFreeTrials.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (exisitingFreeTrial) {
      throw new Error("Free trial already claimed");
    }

    const newFreeTrial = await prisma.userFreeTrials.create({
      data: {
        userId: userId,
        productId: productId,
        name: name,
        phone: phone,
        address: address,
        notes: notes,
      },
    });
    return newFreeTrial;
  }
}

export const freeTrialService = new FreeTrialService();
