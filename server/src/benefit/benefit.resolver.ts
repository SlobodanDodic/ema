import { Query, Resolver } from '@nestjs/graphql';
import { Benefit } from './entities/benefit.entity';
import { BenefitService } from './benefit.service';

@Resolver(() => Benefit)
export class BenefitResolver {
  constructor(private readonly benefitService: BenefitService) {}

  @Query(() => [Benefit], { name: 'getAllHealthcareData' })
  getAllHealthcareData() {
    return this.benefitService.getAllHealthcareData();
  }

  @Query(() => [Benefit], { name: 'getAllFitpassData' })
  getAllFitpassData() {
    return this.benefitService.getAllFitpassData();
  }
}
