import { Module } from '@nestjs/common';
import { BenefitService } from './benefit.service';
import { BenefitResolver } from './benefit.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BenefitService, BenefitResolver, PrismaService],
  exports: [BenefitService],
})
export class BenefitModule {}
