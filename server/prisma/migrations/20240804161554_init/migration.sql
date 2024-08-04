-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "hashedToken" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "birthday" TIMESTAMP(3),
    "contract" TIMESTAMP(3),
    "eyes" TIMESTAMP(3),
    "safety" TIMESTAMP(3),
    "fire" TIMESTAMP(3),
    "firstAid" TIMESTAMP(3),
    "cumulativeLiabilities" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "lastCalculation" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCareMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "insurance" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthCareMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitpassMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FitpassMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liability" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "recordedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Liability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthcareData" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "employeeDiscount" INTEGER NOT NULL,

    CONSTRAINT "HealthcareData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitpassData" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "employeeDiscount" INTEGER NOT NULL,

    CONSTRAINT "FitpassData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeJobTitle" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "EmployeeJobTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedToken_key" ON "User"("hashedToken");

-- CreateIndex
CREATE INDEX "Employee_fullName_idx" ON "Employee"("fullName");

-- CreateIndex
CREATE INDEX "Employee_eyes_safety_fire_firstAid_idx" ON "Employee"("eyes", "safety", "fire", "firstAid");

-- CreateIndex
CREATE INDEX "HealthCareMember_category_idx" ON "HealthCareMember"("category");

-- CreateIndex
CREATE INDEX "HealthCareMember_end_idx" ON "HealthCareMember"("end");

-- CreateIndex
CREATE INDEX "HealthCareMember_employeeId_idx" ON "HealthCareMember"("employeeId");

-- CreateIndex
CREATE INDEX "FitpassMember_category_idx" ON "FitpassMember"("category");

-- CreateIndex
CREATE INDEX "FitpassMember_end_idx" ON "FitpassMember"("end");

-- CreateIndex
CREATE INDEX "FitpassMember_employeeId_idx" ON "FitpassMember"("employeeId");

-- CreateIndex
CREATE INDEX "Payment_amount_idx" ON "Payment"("amount");

-- CreateIndex
CREATE INDEX "Payment_amount_entryDate_idx" ON "Payment"("amount", "entryDate");

-- CreateIndex
CREATE INDEX "Payment_employeeId_idx" ON "Payment"("employeeId");

-- CreateIndex
CREATE INDEX "Payment_employeeId_amount_idx" ON "Payment"("employeeId", "amount");

-- CreateIndex
CREATE INDEX "Liability_amount_idx" ON "Liability"("amount");

-- CreateIndex
CREATE INDEX "Liability_employeeId_idx" ON "Liability"("employeeId");

-- CreateIndex
CREATE INDEX "Liability_employeeId_amount_idx" ON "Liability"("employeeId", "amount");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeJobTitle_value_key" ON "EmployeeJobTitle"("value");

-- AddForeignKey
ALTER TABLE "HealthCareMember" ADD CONSTRAINT "HealthCareMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitpassMember" ADD CONSTRAINT "FitpassMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
