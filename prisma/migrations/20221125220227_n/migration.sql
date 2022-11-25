-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "razorpayId" TEXT,
ALTER COLUMN "paymentId" DROP NOT NULL;
