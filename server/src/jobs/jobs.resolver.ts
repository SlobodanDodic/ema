import { Query, Resolver } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { Jobs } from './entities/jobs.entity';

@Resolver(() => Jobs)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Jobs], { name: 'getJobs' })
  getJobs() {
    const jobs = this.jobsService.getJobs();
    console.log('Resolver getJobs:', jobs);
    return jobs;
  }
}
