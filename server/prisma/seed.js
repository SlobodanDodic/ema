import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.healthcareData.createMany({
    data: [
      { value: 'MediGroup', price: 2350, employeeDiscount: 1500 },
      { value: 'DDOR', price: 3000, employeeDiscount: 1500 },
      { value: 'Sava', price: 0, employeeDiscount: 0 },
      { value: 'Uniqa', price: 0, employeeDiscount: 0 },
      { value: 'Dunav', price: 0, employeeDiscount: 0 },
    ],
  });

  await prisma.fitpassData.createMany({
    data: [{ value: 'Fitpass', price: 2500, employeeDiscount: 0 }],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
