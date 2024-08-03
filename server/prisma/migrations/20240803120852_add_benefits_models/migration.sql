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
