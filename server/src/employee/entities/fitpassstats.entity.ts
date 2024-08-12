import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FitpassStats {
  @Field(() => Int)
  Fitpass: number;

  @Field(() => Int)
  Without: number;

  @Field(() => Int)
  totalEmployees: number;
}
