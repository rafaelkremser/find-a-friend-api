/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('puppy', 'adult', 'senior');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'large', 'giant');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" "Age" NOT NULL,
ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL,
ADD COLUMN     "size" "Size" NOT NULL;
