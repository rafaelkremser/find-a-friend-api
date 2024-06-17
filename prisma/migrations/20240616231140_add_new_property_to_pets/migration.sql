/*
  Warnings:

  - You are about to drop the column `age` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `pets` table. All the data in the column will be lost.
  - Added the required column `species` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Species" AS ENUM ('dog', 'cat', 'bird', 'rabbit', 'fish', 'rodent');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
DROP COLUMN "size",
ADD COLUMN     "species" "Species" NOT NULL;

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "Size";
