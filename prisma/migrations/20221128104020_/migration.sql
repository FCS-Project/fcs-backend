/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyerId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "buyerId";
