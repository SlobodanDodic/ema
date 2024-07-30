import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(data: PaymentInput) {
    return this.prisma.payment.create({
      data: {
        employee: { connect: { id: data.employeeId } },
        amount: data.amount,
        entryDate: data.entryDate,
      },
    });
  }

  async paymentsByEmployee(employeeId: string) {
    return this.prisma.payment.findMany({
      where: { employeeId },
    });
  }

  async getAllPayments() {
    return this.prisma.payment.findMany({
      include: {
        employee: true,
      },
    });
  }
}
