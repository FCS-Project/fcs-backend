/*
  Warnings:

  - The `mobileNumber` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mobileNumber",
ADD COLUMN     "mobileNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");
