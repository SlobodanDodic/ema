import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HealthcareStats {
  @Field(() => Int)
  MediGroup: number;

  @Field(() => Int)
  DDOR: number;

  @Field(() => Int)
  WithoutHC: number;

  @Field(() => Int)
  totalEmployees: number;
}

@ObjectType()
class HealthcareCount {
  @Field(() => String)
  category: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class HealthcareCategoryResponse {
  @Field(() => Int)
  totalMembers: number;

  @Field(() => [HealthcareCount])
  getHealthcareCounts: HealthcareCount[];

  @Field(() => [HealthcareCount])
  getHealthcareInsurances: HealthcareCount[];

  @Field(() => [HealthcareCount])
  getHealthcareAllCounts: HealthcareCount[];
}
