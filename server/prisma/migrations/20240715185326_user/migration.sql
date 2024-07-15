/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_accessToken_key";

-- DropIndex
DROP INDEX "User_refreshToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken",
DROP COLUMN "password",
DROP COLUMN "refreshToken",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedToken" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedToken_key" ON "User"("hashedToken");
