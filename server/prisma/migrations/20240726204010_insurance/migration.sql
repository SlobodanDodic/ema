/*
  Warnings:

  - Added the required column `insurance` to the `HealthCareMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthCareMember" ADD COLUMN     "insurance" TEXT NOT NULL;
