-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "material" TEXT,
ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "available" DROP NOT NULL;
