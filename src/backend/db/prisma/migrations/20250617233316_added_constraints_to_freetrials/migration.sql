/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `UserFreeTrials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserFreeTrials_userId_productId_key";

-- AlterTable
ALTER TABLE "UserFreeTrials" ADD COLUMN     "address" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserFreeTrials_productId_key" ON "UserFreeTrials"("productId");
