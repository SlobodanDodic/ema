/*
  Warnings:

  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
