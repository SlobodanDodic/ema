import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Liability } from './entities/liability.entity';
import { LiabilityInput } from './dto/liability.input';
import { LiabilityService } from './liability.service';

@Resolver(() => Liability)
export class LiabilityResolver {
  constructor(private readonly liabilityService: LiabilityService) {
    console.log('LiabilityResolver initialized');
  }

  @Mutation(() => Liability)
  createLiability(@Args('data') data: LiabilityInput) {
    return this.liabilityService.createLiability(data);
  }

  @Query(() => [Liability], { name: 'liabilitiesByEmployee' })
  liabilitiesByEmployee(@Args('employeeId') employeeId: string) {
    return this.liabilityService.liabilitiesByEmployee(employeeId);
  }

  @Query(() => [Liability], { name: 'getAllLiabilities' })
  getAllLiabilities() {
    return this.liabilityService.getAllLiabilities();
  }

  @Query(() => Float)
  async getTotalLiabilities() {
    return this.liabilityService.getTotalLiabilities();
  }

  @Query(() => Float)
  async getTotalLiabilitiesByEmployee(@Args('employeeId') employeeId: string) {
    return this.liabilityService.getTotalLiabilitiesByEmployee(employeeId);
  }
}
