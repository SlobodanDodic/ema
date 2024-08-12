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
