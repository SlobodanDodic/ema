import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LiabilityService } from './liability.service';
import { LiabilityResolver } from './liability.resolver';

@Module({
  providers: [LiabilityService, LiabilityResolver, PrismaService],
})
export class LiabilityModule {}
