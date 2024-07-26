/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FitpassMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HealthCareMember` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "FitpassMember" DROP CONSTRAINT "FitpassMember_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "HealthCareMember" DROP CONSTRAINT "HealthCareMember_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Employee_id_seq";

-- AlterTable
ALTER TABLE "FitpassMember" DROP CONSTRAINT "FitpassMember_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "employeeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FitpassMember_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FitpassMember_id_seq";

-- AlterTable
ALTER TABLE "HealthCareMember" DROP CONSTRAINT "HealthCareMember_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "employeeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "HealthCareMember_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HealthCareMember_id_seq";

-- AddForeignKey
ALTER TABLE "HealthCareMember" ADD CONSTRAINT "HealthCareMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitpassMember" ADD CONSTRAINT "FitpassMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
