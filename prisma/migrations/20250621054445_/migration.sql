/*
  Warnings:

  - You are about to drop the column `discount` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "discount",
ADD COLUMN     "discountValue" DECIMAL(10,2);
