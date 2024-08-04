import { Module } from '@nestjs/common';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [JobsResolver, JobsService, PrismaService],
})
export class JobsModule {}
