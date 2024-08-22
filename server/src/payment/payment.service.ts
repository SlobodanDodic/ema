import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

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

  async updatePayment(id: string, data: UpdatePaymentInput) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        amount: data.amount,
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

  async getTotalPaymentsByEmployee(employeeId: string) {
    const result = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        employeeId,
      },
    });

    return result._sum.amount || 0;
  }
}
