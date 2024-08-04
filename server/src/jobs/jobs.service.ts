import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobs() {
    const jobs = await this.prisma.employeeJobTitle.findMany();
    console.log('Fetched Jobs:', jobs);
    return jobs;
  }
}
