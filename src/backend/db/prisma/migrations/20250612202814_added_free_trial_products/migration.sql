-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PURCHASABLE', 'TRIAL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'PURCHASABLE';

-- CreateTable
CREATE TABLE "UserFreeTrials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFreeTrials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFreeTrials_userId_productId_key" ON "UserFreeTrials"("userId", "productId");

-- AddForeignKey
ALTER TABLE "UserFreeTrials" ADD CONSTRAINT "UserFreeTrials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFreeTrials" ADD CONSTRAINT "UserFreeTrials_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
