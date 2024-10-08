import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PaymentService, PaymentResolver, PrismaService],
})
export class PaymentModule {}
