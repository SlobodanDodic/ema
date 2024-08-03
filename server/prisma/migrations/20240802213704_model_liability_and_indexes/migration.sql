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

-- CreateIndex
CREATE INDEX "Liability_amount_idx" ON "Liability"("amount");

-- CreateIndex
CREATE INDEX "Liability_employeeId_idx" ON "Liability"("employeeId");

-- CreateIndex
CREATE INDEX "Liability_employeeId_amount_idx" ON "Liability"("employeeId", "amount");

-- CreateIndex
CREATE INDEX "Employee_fullName_idx" ON "Employee"("fullName");

-- CreateIndex
CREATE INDEX "Employee_eyes_safety_fire_firstAid_idx" ON "Employee"("eyes", "safety", "fire", "firstAid");

-- CreateIndex
CREATE INDEX "FitpassMember_category_idx" ON "FitpassMember"("category");

-- CreateIndex
CREATE INDEX "FitpassMember_end_idx" ON "FitpassMember"("end");

-- CreateIndex
CREATE INDEX "FitpassMember_employeeId_idx" ON "FitpassMember"("employeeId");

-- CreateIndex
CREATE INDEX "HealthCareMember_category_idx" ON "HealthCareMember"("category");

-- CreateIndex
CREATE INDEX "HealthCareMember_end_idx" ON "HealthCareMember"("end");

-- CreateIndex
CREATE INDEX "HealthCareMember_employeeId_idx" ON "HealthCareMember"("employeeId");

-- CreateIndex
CREATE INDEX "Payment_amount_idx" ON "Payment"("amount");

-- CreateIndex
CREATE INDEX "Payment_amount_entryDate_idx" ON "Payment"("amount", "entryDate");

-- CreateIndex
CREATE INDEX "Payment_employeeId_idx" ON "Payment"("employeeId");

-- CreateIndex
CREATE INDEX "Payment_employeeId_amount_idx" ON "Payment"("employeeId", "amount");

-- AddForeignKey
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
