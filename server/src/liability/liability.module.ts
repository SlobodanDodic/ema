import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LiabilityService } from './liability.service';
import { LiabilityResolver } from './liability.resolver';
import { CalculationService } from 'src/calculation/calculation.service';
import { BenefitModule } from 'src/benefit/benefit.module';

@Module({
  imports: [BenefitModule],
  providers: [
    LiabilityService,
    LiabilityResolver,
    CalculationService,
    PrismaService,
  ],
  exports: [LiabilityService],
})
export class LiabilityModule {}
